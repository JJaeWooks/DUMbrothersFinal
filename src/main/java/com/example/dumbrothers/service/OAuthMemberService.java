package com.example.dumbrothers.service;

import com.example.dumbrothers.entity.Folder;
import com.example.dumbrothers.entity.Member;
import com.example.dumbrothers.repository.FolderRepository;
import com.example.dumbrothers.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OAuthMemberService extends DefaultOAuth2UserService {
    private final BCryptPasswordEncoder encoder;
    private final MemberRepository memberRepository;
    private final FolderRepository folderRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);
        String provider = userRequest.getClientRegistration().getClientId();
        String providerId = oAuth2User.getAttribute("sub");
        String username = provider + "_" + providerId; //중복이 발생하지 않도록 provider와 providerId를 조합
        String email = oAuth2User.getAttribute("email");
        String role = "ROLE_USER"; //일반 유저
        Optional<Member> findMember = memberRepository.findByName(username);
        if (findMember.isEmpty()) { //찾지 못했다면
            Member member = Member.builder()
                    .name(username)
                    .email(email)
                    .password(encoder.encode("password"))
                    .role(role)
                    .provider(provider)
                    .providerId(providerId).build();
            memberRepository.save(member);
            Folder dumFolder=new Folder();
            dumFolder.setFolderName("dum");
            dumFolder.setMember(member);
            folderRepository.save(dumFolder);
        }
        return oAuth2User;
    }
}