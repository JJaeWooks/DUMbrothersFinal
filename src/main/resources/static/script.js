function changeButton() {
  console.log("실행");

  var divElement = document.getElementById("모든링크1");
  divElement.textContent = "모든링크";

  var image = document.getElementById("ic_folders");
  image.src = "nav/open_folder_svg/ic_folders.svg";

  var button = document.getElementById("open_folder");
  button.style.background = "#f0f6ff";

  var div = document.getElementById("모든링크");
  div.style.color = "rgb(66, 137, 243)";

  var folder_css_c = document.getElementsByClassName("folders");
  for (var i = 0; i < folder_css_c.length; i++) {
    folder_css_c[i].style.background = "white";
    folder_css_c[i].getElementsByTagName("img")[0].src =
      "nav/cre_folder_svg/newfolder.svg";
    folder_css_c[i].getElementsByTagName("div")[0].style.color =
      "rgb(109, 109, 109)";
  }
  var tag_css_c = document.getElementsByClassName("tags");
  for (var i = 0; i < tag_css_c.length; i++) {
    tag_css_c[i].style.background = "white";
    tag_css_c[i].getElementsByTagName("img")[0].src =
      "nav/cre_tag_svg/ic_link.svg";
    tag_css_c[i].getElementsByTagName("div")[0].style.color =
      "rgb(109, 109, 109)";
  }
}

function folderlistgenerate(jsonData) {
  /**jsonData로 부터 폴더 정보를 가진 배열을 만들어냄 백엔드 API사용시에는 필요없을거같긴함*/
  var folders = [];

  // jsonData를 순회하면서 folder 값을 추출하여 folders 배열에 추가
  for (var i = 0; i < jsonData.length; i++) {
    var folder = jsonData[i].folder;
    // folders 배열에 folder 값이 이미 포함되어 있는지 확인 후 추가
    if (!folders.includes(folder)) {
      folders.push(folder);
    }
  }
}
function folderButtoncreate(folders) {
  /**폴더 정보가 담긴 배열로 부터 nav부분에 폴더 요소를 생성함*/
  for (var i = 0; i < folders.length; i++) {
    navElement = document.getElementsByTagName("nav")[0];
    var folderName = folders[i];

    // 새로운 링크 엘리먼트 생성
    var buttonElement = document.createElement("button");
    buttonElement.setAttribute("class", "folders");
    buttonElement.setAttribute("id", folderName);
    buttonElement.addEventListener("click");
    var imgElement = document.createElement("img");
    imgElement.setAttribute("id", "ic_folders");
    imgElement.setAttribute("src", "nav/cre_folder_svg/newfolder.svg");
    buttonElement.appendChild(imgElement);
    //imgElement.setAttribute('alt',"ic_folders");
    var divElement = document.createElement("div");
    divElement.setAttribute("id", folderName);
    divElement.textContent = folderName;
    divElement.style.position = "absolute";
    divElement.style.width = "120px";
    divElement.style.height = "16px";
    divElement.style.left = "49px";
    divElement.style.top = "11px";
    divElement.style.fontFamily = "Roboto";
    divElement.style.fontStyle = "normal";
    divElement.style.fontWeight = "600";
    divElement.style.fontSize = "14px";
    divElement.style.lineHeight = "16px";
    divElement.style.color = "#6D6D6D";
    buttonElement.appendChild(divElement);

    // 링크 엘리먼트를 폴더 버튼에 추가
    navElement.appendChild(buttonElement);
  }
}
function removeContent() {
  /** 게시판 내용 싹다지우기 */
  var itemSection = document.getElementById("items_section");
  while (itemSection.firstChild) {
    itemSection.removeChild(itemSection.firstChild);
  }
}

function removeFoldersAndTags() {
  var folders = document.getElementsByClassName("folders");
  var tags = document.getElementsByClassName("tags");

  // "folders" 클래스명을 가진 요소들 제거
  while (folders.length > 0) {
    folders[0].parentNode.removeChild(folders[0]);
  }

  // "tags" 클래스명을 가진 요소들 제거
  while (tags.length > 0) {
    tags[0].parentNode.removeChild(tags[0]);
  }
}

function listing(filteredData) {
  /**filteredData의 내용물을 itemsection에 나열함 */
  var parentElement = document.getElementById("items_section");
  if (filteredData && Array.isArray(filteredData) && filteredData.length > 0) {
    for (var i = 0; i < filteredData.length; i++) {
      // create a new div element
      var divElement = document.createElement("div");
      divElement.setAttribute("id", "items");
      divElement.setAttribute("class", "items");
      imageUrlText = "url" + "(" + filteredData[i].image + ")";
      divElement.style.backgroundImage = imageUrlText;
      divElement.style.backgroundSize = "216px 108px";
      divElement.style.backgroundRepeat = "no-repeat";
      divElement.addEventListener(
        "click",
        (function (index) {
          return function () {
            if (globalOption != true) window.open(filteredData[index].link);
          };
        })(i)
      );

      // 아이템 드롭다운 메뉴 요소 생성

      var dropdownMenu = document.createElement("ul");
      dropdownMenu.setAttribute("id", "dropdown-menu" + i);
      dropdownMenu.setAttribute("class", "dropdown-menu");
      var innerLiElement = document.createElement("li");
      innerLiElement.textContent = "폴더 저장";
      innerLiElement.addEventListener(
        "click",
        (function (index) {
          return function () {
            //futureChangeFolderName = changeFolder();
            /* 
            console.log("futureChangeFolderName", futureChangeFolderName);
            console.log("urlid", filteredData[index].id);
            console.log("url folder id", filteredData[index].folder.folderId); */
            //console.log("폴더 저장클릭 실행되는지여부");
            //console.log("클릭안에서filteredDatat", filteredData[index].id);
            changeFolder(filteredData[index].id)
              .then(() => {})
              .catch((error) => {
                //console.log("에러 발생:", error);
                // 에러 처리 수행
              });
          };
        })(i)
      );
      var innerLiElement2 = document.createElement("li");
      innerLiElement2.textContent = "링크 삭제";
      innerLiElement2.addEventListener(
        "click",
        (function (index) {
          return function () {
            var requestOptions = {
              method: "DELETE",
              redirect: "follow",
            };

            fetch(
              "http://203.255.3.32:8081/dum/" + filteredData[index].id,
              requestOptions
            )
              .then((response) => response.text())
              .then((result) => {
                alert("삭제에 성공했습니다");

                setTimeout(() => {
                  removeFoldersAndTags();
                  navRefresh();
                }, 300);
                reLoading();
              })
              .catch((error) => console.log("error", error));
          };
        })(i)
      );

      dropdownMenu.style.display = "none";

      dropdownMenu.appendChild(innerLiElement);
      dropdownMenu.appendChild(innerLiElement2);
      divElement.appendChild(dropdownMenu);

      // 드롭다운 메뉴 초기 상태 설정 (숨김)
      // 드롭다운 메뉴를 SVG 요소의 다음 형제로 추가

      // create a new inner div element with id="items_content"
      var innerDivElement = document.createElement("div");
      innerDivElement.setAttribute("id", "items_content");
      innerDivElement.setAttribute("class", "items_content");

      // create a span element to wrap the title node
      var titleSpan = document.createElement("span");
      titleSpan.setAttribute("class", "t_spans");
      titleSpan.style.fontWeight = "bold"; // make the title bold
      titleSpan.style.fontSize = "18px"; // set the font size of the title
      titleSpan.style.display = "inline-block";
      titleSpan.style.width = "190px";
      titleSpan.style.height = "18px";
      titleSpan.style.margin = "0px";
      titleSpan.style.padding = "0px";
      titleSpan.style.overflow = "hidden";
      titleSpan.textContent = filteredData[i].title.substring(0, 17);

      var urlSpan = document.createElement("span");
      urlSpan.setAttribute("class", "u_spans");
      urlSpan.style.fontSize = "10px"; // set the font size of the url
      urlSpan.style.display = "inline-block";
      urlSpan.style.overflow = "hidden";
      tagCombination = "";
      if (filteredData[i].firstTag.length > 9) {
        tagCombination += filteredData[i].firstTag.substring(0, 9);
        tagCombination += "...";
        tagCombination += " ";
      } else {
        tagCombination += filteredData[i].firstTag.substring(0, 9);
        tagCombination += " ";
      }
      if (filteredData[i].secondTag.length > 9) {
        tagCombination += filteredData[i].secondTag.substring(0, 9);
        tagCombination += "...";
        tagCombination += " ";
      } else {
        tagCombination += filteredData[i].secondTag.substring(0, 9);
        tagCombination += " ";
      }
      if (filteredData[i].thirdTag.length > 9) {
        tagCombination += filteredData[i].thirdTag.substring(0, 9);
      } else {
        tagCombination += filteredData[i].thirdTag.substring(0, 9);
      }
      if (tagCombination.length > 29) {
        tagCombination = " ";
      }

      urlSpan.textContent = tagCombination.substring(0, 30);
      /* 
      var svgContainer = document.createElement("div");
      svgContainer.style.width = "24px";
      svgContainer.style.height = "24px";
      svgContainer.style.marign = "0px";
      svgContainer.style.border = "0px";
      svgContainer.setAttribute("class", "svgContainer"); */

      var svgElement = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
      );
      svgElement.setAttribute("viewBox", "0 0 24 24");
      svgElement.setAttribute("width", "24");
      svgElement.setAttribute("height", "24");
      svgElement.setAttribute("class", "svgele");
      svgElement.setAttribute("id", "svg_" + i);
      svgElement.style.zIndex = "9999";
      svgElement.addEventListener(
        "click",
        (function (index) {
          return function () {
            // alert(index);
            var dropdownMenu = document.getElementById("dropdown-menu" + index);

            if (dropdownMenu.style.display === "none") {
              dropdownMenu.style.display = "block";
              globalOption = true;
            } else {
              dropdownMenu.style.display = "none";
              setTimeout(() => (globalOption = false), 100);
            }
          };
        })(i)
      );

      // create circle elements and set their attributes
      var circle1 = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle"
      );
      circle1.setAttribute("cx", "12");
      circle1.setAttribute("cy", "6");
      circle1.setAttribute("r", "2");
      circle1.setAttribute("fill", "#000");

      var circle2 = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle"
      );
      circle2.setAttribute("cx", "12");
      circle2.setAttribute("cy", "12");
      circle2.setAttribute("r", "2");
      circle2.setAttribute("fill", "#000");

      var circle3 = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle"
      );
      circle3.setAttribute("cx", "12");
      circle3.setAttribute("cy", "18");
      circle3.setAttribute("r", "2");
      circle3.setAttribute("fill", "#000");

      // append the circles to the SVG element
      svgElement.appendChild(circle1);
      svgElement.appendChild(circle2);
      svgElement.appendChild(circle3);
      svgElement.style.float = "right";
      //svgContainer.appendChild(svgElement);

      // append the text nodes to their corresponding span elements
      innerDivElement.appendChild(titleSpan);
      innerDivElement.appendChild(svgElement);
      innerDivElement.appendChild(document.createElement("br"));
      innerDivElement.appendChild(urlSpan);

      // append the inner div element to the outer div element
      divElement.appendChild(innerDivElement);
      // divElement.style.zIndex = "10";

      // append the new div element to the parent element
      parentElement.appendChild(divElement);
      onlyOneOptionCanBeAlive();
      if (globalView == 2) {
        changeViewIntoSecond();
      }
    }
  } else {
    console.log("Error: Invalid or empty filteredData array.");
  }
}
function asyncRequest() {
  /**주소로 부터 jsonData를 받아와서 itemsection에 나열함 */
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://203.255.3.32:8081/dum", true);
  xhr.responseType = "json";
  var jsonData;
  xhr.onload = function () {
    if (xhr.status === 200) {
      // file loaded successfully
      jsonData = xhr.response;
      //console.log(jsonData); // display the loaded JSON data
      //console.log(jsonData.length);
      var parentElement = document.getElementById("items_section");
      // 새로운 배열을 생성하여 folder 값을 저장할 변수

      listing(jsonData);

      //jsonData.length
    }
  };
  xhr.send();
}
function asyncRequestfolderID(id) {
  //console.log("asyncRequestfolder함수에서의folderid", id);
  var xhr = new XMLHttpRequest();
  url = "203.255.3.32:8081/dum/folder/" + id;
  //console.log("url", url);
  xhr.open("GET", url, true);
  xhr.responseType = "json";
  var jsonData;
  xhr.onload = function () {
    if (xhr.status === 200) {
      // file loaded successfully
      jsonData = xhr.response;
      //console.log(jsonData); // display the loaded JSON data
      //console.log(jsonData.length);
      var parentElement = document.getElementById("items_section");
      // 새로운 배열을 생성하여 folder 값을 저장할 변수

      listing(jsonData);

      //jsonData.length
    }
  };
  xhr.send();
}

function toggleImage(items) {
  var image = document.getElementById("ic_layout1");
  if (globalView == 1) {
    image.setAttribute("src", "header_svg/ic_layout2.svg");
    var items = document.getElementsByClassName("items");
    var items_content = document.getElementsByClassName("items_content");
    var u_spans = document.getElementsByClassName("u_spans");
    var t_spans = document.getElementsByClassName("t_spans");
    var svgele = document.getElementsByClassName("svgele");
    var drop_menu = document.getElementsByClassName("dropdown-menu");

    for (var i = 0; i < items.length; i++) {
      items[i].style.display = "block"; // display 속성 변경
      items[i].style.backgroundImage = "none";
      items[i].style.top = "8px";
      items[i].style.width = "936px";
      items[i].style.height = "42px";
      items_content[i].style.top = "-3px";
      items_content[i].style.height = "42px";
      items_content[i].style.width = "216px";
      items_content[i].style.borderRadius = "0px";
      items_content[i].style.backgroundColor = "transparent";
      u_spans[i].style.position = "absolute";
      u_spans[i].style.left = "470px";
      u_spans[i].style.top = "14px";
      u_spans[i].style.width = "407px";

      t_spans[i].style.position = "absolute";
      t_spans[i].style.top = "15px";
      t_spans[i].style.left = "10px";

      svgele[i].style.position = "absolute";
      svgele[i].style.top = "13px";
      svgele[i].style.left = "905px";

      drop_menu[i].style.left = "938px";
      drop_menu[i].style.top = "9px";

      globalView = 2;

      //console.log("globalFolderId", globalFolderId);
      //console.log("globalTagName", globalTagName);
    }
  } else {
    image.setAttribute("src", "header_svg/ic_layout1.svg");
    removeContent();
    if (globalFolderId == null && globalTagName == null) {
      asyncRequest();
    } else {
      if (globalFolderId != null) {
        folderListing(globalFolderId);
      } else if (globalTagName != null) {
        tagListing(globalTagName);
      }
    }
    globalView = 1;
    //console.log("globalFolderId", globalFolderId);
    //console.log("globalTagName", globalTagName);
  }
}

function folderCreate() {
  return new Promise((resolve, reject) => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://203.255.3.32:8081/dum/folder", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // 여기서 result를 사용하세요
        var totalFolderName = [];
        for (i = 0; i < result.length; i++) {
          navElement = document.getElementsByTagName("nav")[0];
          var fullFolderName = result[i]["folderName"];
          var folderName = result[i]["folderName"];
          if (folderName.length > 11) {
            folderName = folderName.substring(0, 10) + "...";
          }
          var folderId = result[i]["folderId"];
          var urlCounter = result[i]["urlCounter"];
          totalFolderName.push(folderName);

          var buttonElement = document.createElement("button");
          buttonElement.setAttribute("class", "folders");
          buttonElement.setAttribute("id", folderId);

          // buttonElement.addEventListener("mouseover", function(folderId) {
          //   // 마우스를 요소 위에 올렸을 때 실행되는 코드 작성
          //   var folder_css = document.getElementById(id);
          //   console.log("마우스를 요소 위에 올렸습니다.");
          //   console.log(folder_css);
          //   // var folder_css = document.getElementById(id);
          //   //     folder_css.style.background = "#F0F6FF";
          // });

          // // 마우스를 요소에서 뺐을 때 이벤트 리스너
          // buttonElement.addEventListener("mouseout", function(folderId) {
          //   // 마우스를 요소에서 뺐을 때 실행되는 코드 작성
          //   var folder_css = document.getElementById(id);
          //   console.log("마우스를 요소에서 뺐습니다.");
          //   console.log(folder_css);
          //   // var folder_css = document.getElementById(id);
          //   //     folder_css.style.background = "white";
          // });

          buttonElement.addEventListener(
            "mouseover",
            (function (id) {
              return function () {
                var folder_css = document.getElementById(id);
                folder_css.style.background = "#f5f5f5";

                var fourthChild = folder_css.children[4];
                fourthChild.style.display = "block";

                var thirdChild = folder_css.children[2];
                thirdChild.style.display = "none";

                console.log("마우스를 요소 위에 올렸습니다.");
                console.log(folder_css);
              };
            })(folderId)
          );
          buttonElement.addEventListener(
            "mouseout",
            (function (id) {
              return function () {
                var folder_css = document.getElementById(id);
                folder_css.style.background = "white";

                var fourthChild = folder_css.children[4];
                fourthChild.style.display = "none";

                var thirdChild = folder_css.children[2];
                thirdChild.style.display = "block";

                console.log(folder_css);
              };
            })(folderId)
          );
          buttonElement.addEventListener(
            "click",
            (function (id, folderName, fullFolderName) {
              return function () {
                {
                  item_section_title = document.getElementById("모든링크1");
                  item_section_title.textContent = fullFolderName;
                  restoreButton();

                  //태그 css 비활성화
                  var tag_css_c = document.getElementsByClassName("tags");
                  for (var i = 0; i < tag_css_c.length; i++) {
                    tag_css_c[i].style.background = "white";
                    tag_css_c[i].getElementsByTagName("img")[0].src =
                      "nav/cre_tag_svg/ic_link.svg";
                    tag_css_c[i].getElementsByTagName("div")[0].style.color =
                      "rgb(109, 109, 109)";
                  }

                  //폴더 css 비활성화
                  var folder_css_c = document.getElementsByClassName("folders");
                  for (var i = 0; i < result.length; i++) {
                    folder_css_c[i].style.background = "white";
                    folder_css_c[i].getElementsByTagName("img")[0].src =
                      "nav/cre_folder_svg/newfolder.svg";
                    folder_css_c[i].getElementsByTagName("div")[0].style.color =
                      "rgb(109, 109, 109)";
                  }

                  //클릭한 폴더 css 활성화
                  var folder_css = document.getElementById(id);
                  folder_css.style.background = "#F0F6FF";
                  folder_css.getElementsByTagName("img")[0].src =
                    "nav/open_folder_svg/ic_folders.svg";
                  folder_css.getElementsByTagName("div")[0].style.color =
                    "#4289f3";
                  console.log(id);
                  folderListing(id);
                  console.log("클릭했을때 글로벌뷰", globalView);
                }
                //모든링크 css 비활성화
              };
            })(folderId, folderName, fullFolderName)
          );

          // var dropdownMenu = document.createElement("ul");
          // dropdownMenu.setAttribute("id", "dropdown-menu-folder" + i);
          // dropdownMenu.setAttribute("class", "dropdown-menu");
          // var innerLiElement = document.createElement("li");
          // innerLiElement.textContent = "폴더 저장";
          // var innerLiElement2 = document.createElement("li");
          // innerLiElement2.textContent = "링크 삭제";
          // dropdownMenu.style.display = "block";
          // dropdownMenu.appendChild(innerLiElement);
          // dropdownMenu.appendChild(innerLiElement2);
          // buttonElement.appendChild(dropdownMenu);
          var divElement_0 = document.createElement("div");

          var imgElement = document.createElement("img");
          imgElement.setAttribute("id", "ic_folders");
          imgElement.setAttribute("src", "nav/cre_folder_svg/newfolder.svg");
          buttonElement.appendChild(imgElement);
          //imgElement.setAttribute('alt',"ic_folders");

          var divElement = document.createElement("div");
          divElement.setAttribute("id", folderName);
          divElement.textContent = folderName;
          divElement.style.position = "absolute";
          divElement.style.width = "179px";
          divElement.style.textAlign = "left";
          divElement.style.height = "16px";
          divElement.style.left = "49px";
          divElement.style.top = "13px";
          divElement.style.fontFamily = "Roboto";
          divElement.style.fontStyle = "normal";
          divElement.style.fontWeight = "600";
          divElement.style.fontSize = "14px";
          divElement.style.lineHeight = "16px";
          divElement.style.color = "#6D6D6D";
          buttonElement.appendChild(divElement);

          var d_urlCounter = document.createElement("div");
          d_urlCounter.setAttribute("id", urlCounter);
          d_urlCounter.textContent = urlCounter;
          d_urlCounter.style.position = "absolute";
          d_urlCounter.style.width = "179px";
          d_urlCounter.style.textAlign = "left";
          d_urlCounter.style.height = "16px";
          d_urlCounter.style.left = "190px";
          d_urlCounter.style.top = "13px";
          d_urlCounter.style.fontFamily = "Roboto";
          d_urlCounter.style.fontStyle = "normal";
          d_urlCounter.style.fontWeight = "600";
          d_urlCounter.style.fontSize = "14px";
          d_urlCounter.style.lineHeight = "16px";
          d_urlCounter.style.color = "#6D6D6D";
          buttonElement.appendChild(d_urlCounter);

          //네이게이션 드롭다운 메뉴 추가
          var dropdownNav = document.createElement("ul");
          dropdownNav.setAttribute("id", "dropdown-nav" + i);
          dropdownNav.setAttribute("class", "dropdown-nav");

          var innerLiElement1 = document.createElement("li");
          innerLiElement1.textContent = "폴더 수정";

          var innerLiElement2 = document.createElement("li");
          innerLiElement2.textContent = "폴더 삭제";

          dropdownNav.style.display = "none";

          innerLiElement1.addEventListener(
            "click",
            (function (folderName, totalFolderName, folderId) {
              return function () {
                console.log(folderName, totalFolderName);
                currentTextelement = document.getElementById(folderName);
                transformFolderName = prompt(
                  "현재 폴더명 : " +
                    folderName +
                    "\n 변경하실 폴더명을 입력해주세요."
                );

                if (totalFolderName.includes(transformFolderName)) {
                  alert(transformFolderName + "은 이미 존재하는 폴더명입니다.");
                } else if (transformFolderName == null) {
                  alert("값을 입력해주세요.");
                } else {
                  var myHeaders = new Headers();
                  myHeaders.append("Content-Type", "application/json");

                  var raw = JSON.stringify({
                    folderName: transformFolderName,
                  });

                  var requestOptions = {
                    method: "PATCH",
                    headers: myHeaders,
                    body: raw,
                    redirect: "follow",
                  };
                  killDropDownForNav();

                  fetch(
                    "http://203.255.3.32:8081/dum/folder/" + folderId,
                    requestOptions
                  )
                    .then((response) => response.json())
                    .then((result) => {
                      console.log(result);
                      currentTextelement.textContent = transformFolderName;
                    })
                    .catch((error) => console.log("error", error));
                }
              };
            })(folderName, totalFolderName, folderId)
          );

          innerLiElement2.addEventListener(
            "click",
            (function (folderId) {
              return function () {
                killDropDownForNav();
                console.log(folderId);
                var requestOptions = {
                  method: "DELETE",
                  redirect: "follow",
                };

                var requestOptions = {
                  method: "DELETE",
                  redirect: "follow",
                };

                fetch(
                  "http://203.255.3.32:8081/dum/folder/" + folderId,
                  requestOptions
                )
                  .then((response) => {
                    response.json();
                    location.reload();
                    alert("폴더를 성공적으로 삭제하였습니다!");
                  })
                  .catch((error) => alert("error", error));
              };
            })(folderId)
          );

          dropdownNav.appendChild(innerLiElement1);
          dropdownNav.appendChild(innerLiElement2);
          buttonElement.appendChild(dropdownNav);

          var svgElement = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "svg"
          );
          svgElement.setAttribute("viewBox", "0 0 24 24");
          svgElement.setAttribute("width", "24");
          svgElement.setAttribute("height", "24");
          svgElement.setAttribute("class", "svgele_nav");
          svgElement.setAttribute("id", "svg_folder" + i);
          svgElement.style.zIndex = "9999";
          svgElement.style.display = "none";
          svgElement.addEventListener(
            "click",
            (function (index) {
              return function () {
                // alert(index);
                var dropdownMenu = document.getElementById(
                  "dropdown-nav" + index
                );

                if (dropdownMenu.style.display === "none") {
                  dropdownMenu.style.display = "block";
                  globalOption = true;
                } else {
                  dropdownMenu.style.display = "none";
                  setTimeout(() => (globalOption = false), 100);
                }
              };
            })(i)
          );

          var circle1 = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "circle"
          );
          circle1.setAttribute("cx", "12");
          circle1.setAttribute("cy", "6");
          circle1.setAttribute("r", "2");
          circle1.setAttribute("fill", "#000");

          var circle2 = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "circle"
          );
          circle2.setAttribute("cx", "12");
          circle2.setAttribute("cy", "12");
          circle2.setAttribute("r", "2");
          circle2.setAttribute("fill", "#000");

          var circle3 = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "circle"
          );
          circle3.setAttribute("cx", "12");
          circle3.setAttribute("cy", "18");
          circle3.setAttribute("r", "2");
          circle3.setAttribute("fill", "#000");

          // append the circles to the SVG element
          svgElement.appendChild(circle1);
          svgElement.appendChild(circle2);
          svgElement.appendChild(circle3);
          svgElement.style.float = "right";
          svgElement.style.transform = "rotate(90deg)";
          buttonElement.appendChild(svgElement);

          // 링크 엘리먼트를 폴더 버튼에 추가
          navElement.appendChild(buttonElement);
        }
        onlyOneOptionCanBeAlive();
        onlyOneOptionCanBeAliveForNav();
        resolve();
      })
      .catch((error) => reject(error));
  });
}

function tagCreate() {
  return new Promise((resolve, reject) => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://203.255.3.32:8081/dum/tags", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // 여기서 result를 사용하세요
        for (i = 0; i < result.length; i++) {
          navElement = document.getElementsByTagName("nav")[0];
          //console.log("각i별결과값", result[i]);
          realTagName = result[i];
          var tagName = "";
          if (result[i].length > 9) {
            tagName = result[i].substring(0, 9);
            tagName += "...";
          } else {
            tagName = result[i].substring(0, 9);
          }
          //console.log("tagName", tagName);
          var buttonElement = document.createElement("button");
          buttonElement.setAttribute("class", "tags");
          buttonElement.setAttribute("id", tagName);
          buttonElement.addEventListener(
            "mouseover",
            (function (id) {
              return function () {
                var folder_css = document.getElementById(id);
                folder_css.style.background = "#f5f5f5";

                var fourthChild = folder_css.children[4];
                fourthChild.style.display = "block";

                var thirdChild = folder_css.children[2];
                thirdChild.style.display = "none";

                console.log("마우스를 요소 위에 올렸습니다.");
                console.log(folder_css);
              };
            })(tagName)
          );
          buttonElement.addEventListener(
            "mouseout",
            (function (id) {
              return function () {
                var folder_css = document.getElementById(id);
                folder_css.style.background = "white";

                var fourthChild = folder_css.children[4];
                fourthChild.style.display = "none";

                var thirdChild = folder_css.children[2];
                thirdChild.style.display = "block";

                console.log(folder_css);
              };
            })(tagName)
          );
          buttonElement.addEventListener(
            "click",
            (function (id, realTagName) {
              return function () {
                //모든링크 css 비활성화
                item_section_title = document.getElementById("모든링크1");
                item_section_title.textContent = id;
                restoreButton();

                //폴더 css 비활성화
                var folder_css_c = document.getElementsByClassName("folders");
                for (var i = 0; i < folder_css_c.length; i++) {
                  folder_css_c[i].style.background = "white";
                  folder_css_c[i].getElementsByTagName("img")[0].src =
                    "nav/cre_folder_svg/newfolder.svg";
                  folder_css_c[i].getElementsByTagName("div")[0].style.color =
                    "rgb(109, 109, 109)";
                }
                console.log("폴더 활성화 끝");

                //태그 css 비활성화
                var tag_css_c = document.getElementsByClassName("tags");
                for (var i = 0; i < result.length; i++) {
                  tag_css_c[i].style.background = "white";
                  tag_css_c[i].getElementsByTagName("img")[0].src =
                    "nav/cre_tag_svg/ic_link.svg";
                  tag_css_c[i].getElementsByTagName("div")[0].style.color =
                    "rgb(109, 109, 109)";
                }

                //클릭한 태그 활성화
                var tag_css = document.getElementById(id);
                tag_css.style.background = "#F0F6FF";
                tag_css.getElementsByTagName("img")[0].src =
                  "nav/cre_tag_svg/ic_link_on.svg";
                tag_css.getElementsByTagName("div")[0].style.color = "#4289f3";
                console.log(id);

                tagListing(realTagName);
              };
            })(tagName, realTagName)
          );
          var imgElement = document.createElement("img");
          imgElement.setAttribute("id", "ic_folders");
          imgElement.setAttribute("src", "nav/cre_tag_svg/ic_link.svg");
          buttonElement.appendChild(imgElement);
          //imgElement.setAttribute('alt',"ic_folders");
          var divElement = document.createElement("div");
          divElement.setAttribute("id", tagName);
          divElement.textContent = tagName;
          divElement.style.position = "absolute";
          divElement.style.width = "179px";
          divElement.style.textAlign = "left";
          divElement.style.height = "16px";
          divElement.style.left = "49px";
          divElement.style.top = "11px";
          divElement.style.fontFamily = "Roboto";
          divElement.style.fontStyle = "normal";
          divElement.style.fontWeight = "600";
          divElement.style.fontSize = "14px";
          divElement.style.lineHeight = "16px";
          divElement.style.color = "#6D6D6D";
          buttonElement.appendChild(divElement);

          // var d_tagCounter = document.createElement("div");
          // d_urlCounter.setAttribute("id", re);
          // d_urlCounter.textContent = urlCounter;
          // d_urlCounter.style.position = "absolute";
          // d_urlCounter.style.width = "179px";
          // d_urlCounter.style.textAlign = "left";
          // d_urlCounter.style.height = "16px";
          // d_urlCounter.style.left = "190px";
          // d_urlCounter.style.top = "13px";
          // d_urlCounter.style.fontFamily = "Roboto";
          // d_urlCounter.style.fontStyle = "normal";
          // d_urlCounter.style.fontWeight = "600";
          // d_urlCounter.style.fontSize = "14px";
          // d_urlCounter.style.lineHeight = "16px";
          // d_urlCounter.style.color = "#6D6D6D";
          // buttonElement.appendChild(d_urlCounter);

          // var svgElement = document.createElementNS(
          //   "http://www.w3.org/2000/svg",
          //   "svg"
          // );
          // svgElement.setAttribute("viewBox", "0 0 24 24");
          // svgElement.setAttribute("width", "24");
          // svgElement.setAttribute("height", "24");
          // svgElement.setAttribute("class", "svgele_nav");
          // svgElement.setAttribute("id", "svg_" + i);
          // svgElement.style.zIndex = "9999";

          // var circle1 = document.createElementNS(
          //   "http://www.w3.org/2000/svg",
          //   "circle"
          // );
          // circle1.setAttribute("cx", "12");
          // circle1.setAttribute("cy", "6");
          // circle1.setAttribute("r", "2");
          // circle1.setAttribute("fill", "#000");

          // var circle2 = document.createElementNS(
          //   "http://www.w3.org/2000/svg",
          //   "circle"
          // );
          // circle2.setAttribute("cx", "12");
          // circle2.setAttribute("cy", "12");
          // circle2.setAttribute("r", "2");
          // circle2.setAttribute("fill", "#000");

          // var circle3 = document.createElementNS(
          //   "http://www.w3.org/2000/svg",
          //   "circle"
          // );
          // circle3.setAttribute("cx", "12");
          // circle3.setAttribute("cy", "18");
          // circle3.setAttribute("r", "2");
          // circle3.setAttribute("fill", "#000");

          // // append the circles to the SVG element
          // svgElement.appendChild(circle1);
          // svgElement.appendChild(circle2);
          // svgElement.appendChild(circle3);
          // svgElement.style.float = "right";
          // svgElement.style.transform = "rotate(90deg)";
          // buttonElement.appendChild(svgElement);

          // 링크 엘리먼트를 폴더 버튼에 추가
          navElement.appendChild(buttonElement);
        }
        resolve();
      })
      .catch((error) => reject(error));
  });
}

function folderListing(folderId) {
  globalTagName = null;
  globalFolderId = folderId;
  removeContent();
  url = "http://203.255.3.32:8081/dum/folder/" + folderId;
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch("http://203.255.3.32:8081/dum/folder/" + folderId, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      // 여기서 result를 사용하세요
      listing(result); // 예시로 콘솔에 출력
      // result를 사용하여 원하는 작업을 수행하세요
      console.log(result);
    })
    .catch((error) => console.log("error", error));
}

function tagListing(tagName) {
  globalFolderId = null;
  globalTagName = tagName;
  removeContent();
  url = "http://203.255.3.32:8081/dum/tags/" + tagName;
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch("http://203.255.3.32:8081/dum/tags/" + tagName, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      //console.log("tagListing내부fetch", result);
      listing(result);
    })
    .catch((error) => console.log("error", error));
}

function killDropDown() {
  var dropdownMenus = document.getElementsByClassName("dropdown-menu");
  for (var i = 0; i < dropdownMenus.length; i++) {
    dropdownMenus[i].style.display = "none";
  }
}
function globalOptionZero() {
  globalOption = false;
}
function onlyOneOptionCanBeAlive() {
  var svgeleItems = document.getElementsByClassName("svgele");
  for (var i = 0; i < svgeleItems.length; i++) {
    svgeleItems[i].addEventListener("focusout", () => {
      setTimeout(function () {
        killDropDown();
        globalOptionZero();
      }, 150);
    });
  }
}

function killDropDownForNav() {
  var navDropDownMenus = document.getElementsByClassName("dropdown-nav");
  for (var i = 0; i < navDropDownMenus.length; i++) {
    navDropDownMenus[i].style.display = "none";
  }
}
function globalOptionZeroforNav() {
  globalOptionNav = false;
}
function onlyOneOptionCanBeAliveForNav() {
  var svgelementsNAV = document.getElementsByClassName("svgele_nav");
  for (var i = 0; i < svgelementsNAV.length; i++) {
    svgelementsNAV[i].addEventListener("focusout", () => {
      setTimeout(function () {
        killDropDownForNav();
        globalOptionZeroforNav();
      }, 150);
    });
  }
}

function submitForm() {
  var urlInput = document.getElementById("link_input");
  var urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

  if (!urlPattern.test(urlInput.value)) {
    showAlert("올바른 URL 형식이 아닙니다.");
    return false; // 폼 제출을 막습니다.
  }

  var urlInputValue = urlInput.value;
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    link: urlInputValue,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  //전송 버튼 비활성화
  var button = document.getElementById("btn_blue");
  button.disabled = true;
  //console.log("버튼비활성화");
  //전송 이미지 변경
  var img = document.getElementById("btn_img");
  img.src = "header_svg/btn_run.svg";
  //console.log("버튼클릭");
  //7초후 버튼 활성화, 이미지 원복, 전송 팝업 표시
  showLoadingAnimation();
  setTimeout(function () {
    button.disabled = false;
  }, 6000);
  //console.log("버튼무력화");
  setTimeout(function () {
    img.src = "header_svg/btn_blue.svg";
  }, 6000);
  //console.log("이미지원복");
  setTimeout(function () {
    hideLoadingAnimation();
    //console.log("나는 셋타입");
  }, 6000);
  //console.log("fetch전꺼임");
  fetch("http://203.255.3.32:8081/dum/input", requestOptions)
    .then((response) => {
      if (response.ok) {
        showAlert("요청이 성공적으로 송신되었습니다.");
        var link_input = document.getElementById("link_input");
        link_input.value = "";

        if (globalFolderId == null && globalTagName == null) {
          removeContent();
          asyncRequest();
        } else if (globalFolderId != null) {
          folderListing(globalFolderId);
        } else {
          tagListing(globalTagName);
        }
        //console.log("아이템뿌리기 실행됨");
      } else {
        showAlert("요청이 실패했습니다. 다시 시도해주세요.");
      }
    })
    .catch((error) => {
      console.log("error", error);
      showAlert("요청이 실패했습니다. 다시 시도해주세요.");
    });
}

// url입력후 엔터로 전송처리
function checkEnter(event) {
  if (event.keyCode === 13 || event.keyCode === 3) {
    event.preventDefault(); // 기본 Enter 동작을 막음
    submitForm(); // 버튼 클릭과 동일한 동작 수행
  }
}
// 링크 post시 팝업창 출력 함수
function showAlert(message) {
  var modal = document.getElementById("modal");
  var modalMessage = document.getElementById("modal-message");

  modal.style.display = "block";
  modalMessage.innerText = message;

  var closeBtn = document.getElementsByClassName("close")[0];
  closeBtn.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  // // ESC 키를 눌렀을 때 팝업 창 종료 (크로스 브라우징 처리)
  // window.onkeydown = function (event) {
  //   if (event.key === "Escape" || event.key === "Esc") { // "Escape"는 표준, "Esc"는 일부 브라우저에서 사용하는 키값입니다.
  //   modal.style.display = "none";
  //   }
  // }
  window.onkeydown = function (event) {
    if (event.key !== "Enter") {
      // Enter 키를 제외한 다른 키를 눌렀을 때
      modal.style.display = "none";
    }
  };
}

function showLoadingAnimation() {
  var loadingElement = document.getElementById("loading");
  loadingElement.style.display = "inline-block";
}

function hideLoadingAnimation() {
  var loadingElement = document.getElementById("loading");
  loadingElement.style.display = "none";
}

function reLoading() {
  if (globalFolderId == null && globalTagName == null) {
    removeContent();
    asyncRequest();
  } else if (globalFolderId != null) {
    folderListing(globalFolderId);
  } else {
    tagListing(globalTagName);
  }
}
function openPopupAndGetButtonValue(folderNames, folderIds, linkId) {
  return new Promise((resolve, reject) => {
    const popupWidth = 400;
    const popupHeight = 200;
    const buttonWidth = 150; // 버튼의 고정 너비

    // 화면의 중앙에 위치하도록 좌표 계산
    const screenWidth =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    const screenHeight =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;
    const left = (screenWidth - popupWidth) / 2;
    const top = (screenHeight - popupHeight) / 2;

    const popupWindow = window.open(
      "",
      "_blank",
      `width=${popupWidth},height=${popupHeight},left=${left},top=${top}`
    );

    const listContainer = document.createElement("ul");
    listContainer.style.listStyleType = "none";
    listContainer.style.padding = "0";
    listContainer.style.textAlign = "center";

    folderNames.forEach((value) => {
      const listItem = document.createElement("li");
      listItem.style.marginBottom = "5px";

      const button = document.createElement("button");
      button.textContent = value;
      button.style.width = `${buttonWidth}px`; // 버튼의 너비를 고정값으로 설정
      button.style.padding = "5px 10px";
      button.style.border = "1px solid #ccc";
      button.style.borderRadius = "4px";
      button.style.background = "#f1f1f1";
      button.style.cursor = "pointer";

      button.addEventListener("click", function () {
        const buttonValue = this.textContent;
        popupWindow.close();
        for (var i = 0; i < folderNames.length; i++) {
          if (buttonValue == folderNames[i]) {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
              folderId: folderIds[i],
            });

            var requestOptions = {
              method: "PATCH",
              headers: myHeaders,
              body: raw,
              redirect: "follow",
            };

            fetch("http://203.255.3.32:8081/dum/" + linkId, requestOptions)
              .then((response) => response.text())
              .then((result) => console.log(result))
              .catch((error) => console.log("error", error));
            break;
          }
        }
        setTimeout(() => {
          console.log("저장완료");
          removeFoldersAndTags();
          navRefresh();
        }, 300);
        //resolve(buttonValue);
      });

      listItem.appendChild(button);
      listContainer.appendChild(listItem);
    });

    popupWindow.document.body.appendChild(listContainer);
  });
}

function newopenPopupAndGetButtonValue(buttonValues) {
  const popupWindow = window.open("", "_blank", "width=400,height=200");
  //buttonValues는 폴더명 배열
  const buttonContainer = document.createElement("div");

  buttonValues.forEach((value) => {
    const button = document.createElement("button");
    button.textContent = value;

    button.addEventListener("click", function () {
      const buttonValue = this.textContent;
      popupWindow.close();
      return buttonValue;
    });

    buttonContainer.appendChild(button);
  });

  popupWindow.document.body.appendChild(buttonContainer);
}

function changeFolder(linkId) {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  return fetch("http://203.255.3.32:8081/dum/folder", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      const folderIds = result.map((item) => item.folderId);
      const folderNames = result.map((item) => item.folderName);
      /* console.log("folderIds", folderIds);
      console.log("folderNames", folderNames); */
      openPopupAndGetButtonValue(folderNames, folderIds, linkId);
    })
    .catch((error) => {
      console.error("오류 발생:", error);
    });
}

function changeImage_hover(isHovered) {
  var btnImg = document.getElementById("btn_img");
  if (isHovered) {
    btnImg.src = "header_svg/btn_blue=hover.svg"; // 마우스를 올렸을 때의 이미지 경로
  } else {
    btnImg.src = "header_svg/btn_blue.svg"; // 마우스가 벗어났을 때의 이미지 경로
  }
}

function changeImage_press(isPressed) {
  var btnImg = document.getElementById("btn_img");
  var originalSrc = btnImg.src; // 원래 이미지의 경로

  if (isPressed) {
    btnImg.src = "header_svg/btn_blue=pressed.svg"; // 버튼을 누르고 있을 때의 이미지 경로
  } else {
    btnImg.src = originalSrc; // 버튼을 뗐을 때 원래 이미지로 돌아옴
  }
}

//모든링크 버튼 누르면 활성화 css로 바꾸기

//다른 폴더, 태그 누르면 모드링크 비활성화
function restoreButton() {
  var image = document.getElementById("ic_folders");
  image.src = "nav/cre_folder_svg/newfolder.svg";

  var button = document.getElementById("open_folder");
  button.style.background = "white";

  var div = document.getElementById("모든링크");
  div.style.color = "rgb(109, 109, 109)";
}

function changeViewIntoSecond() {
  var image = document.getElementById("ic_layout1");

  image.setAttribute("src", "header_svg/ic_layout2.svg");
  var items = document.getElementsByClassName("items");
  var items_content = document.getElementsByClassName("items_content");
  var u_spans = document.getElementsByClassName("u_spans");
  var t_spans = document.getElementsByClassName("t_spans");
  var svgele = document.getElementsByClassName("svgele");
  var drop_menu = document.getElementsByClassName("dropdown-menu");

  for (var i = 0; i < items.length; i++) {
    console.log(items[i]);
    items[i].style.display = "block"; // display 속성 변경
    items[i].style.backgroundImage = "none";
    items[i].style.top = "8px";
    items[i].style.width = "936px";
    items[i].style.height = "42px";
    items_content[i].style.top = "-3px";
    items_content[i].style.height = "42px";
    items_content[i].style.width = "216px";
    items_content[i].style.borderRadius = "0px";
    items_content[i].style.backgroundColor = "transparent";
    u_spans[i].style.position = "absolute";
    u_spans[i].style.left = "470px";
    u_spans[i].style.top = "14px";
    u_spans[i].style.width = "407px";

    t_spans[i].style.position = "absolute";
    t_spans[i].style.top = "15px";
    t_spans[i].style.left = "10px";

    svgele[i].style.position = "absolute";
    svgele[i].style.top = "13px";
    svgele[i].style.left = "905px";

    drop_menu[i].style.left = "938px";
    drop_menu[i].style.top = "9px";
  }
}

function createNewFolder() {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch("http://203.255.3.32:8081/dum/folder", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      try {
        var folderNames = [];
        for (var i = 0; i < result.length; i++) {
          folderNames.push(result[i].folderName);
        }
        var folderNamesText = "기존 폴더명 ";
        for (var i = 0; i < folderNames.length; i++) {
          folderNamesText += " " + folderNames[i];
        }

        var newFolderName = prompt(folderNamesText);
        if (newFolderName.length >= 20) {
          throw "너무 긴 폴더명입니다!!!";
        }

        if (folderNames.includes(newFolderName)) {
          throw newFolderName + "은 이미 존재하는 폴더명입니다!!!!";
        }
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          folderName: newFolderName,
        });

        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        fetch("http://203.255.3.32:8081/dum/folder/add", requestOptions)
          .then((response) => response.json())
          .then((result) => {
            setTimeout(() => {
              console.log("저장완료");
              removeFoldersAndTags();
              navRefresh();
            }, 300);
          })

          .catch((error) => console.log("error", error));
      } catch (e) {
        alert(e);
      }
    })
    .catch((error) => console.log("error", error));
}

globalFolderId = null;
globalTagName = null;
globalOption = false;
globalView = 1;
globalOptionNav = null;

async function executeAsyncCode() {
  await asyncRequest();
  await folderCreate();
  tagCreate();
  onlyOneOptionCanBeAlive();
  onlyOneOptionCanBeAliveForNav();
}

executeAsyncCode();
window.onclick = function (event) {
  // 클릭 이벤트 발생 시 실행될 코드
  //console.log("클릭 이벤트가 발생했습니다.");
  //console.log("클릭한 요소:", event.target);
};

async function navRefresh() {
  await folderCreate();
  tagCreate();
}
