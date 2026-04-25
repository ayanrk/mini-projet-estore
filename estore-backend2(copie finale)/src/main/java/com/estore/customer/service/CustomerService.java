package com.estore.customer.service;

import com.estore.customer.dto.AuthDTO.*;
import com.estore.customer.entity.Profile;
import com.estore.customer.entity.User;
import com.estore.customer.repository.ProfileRepository;
import com.estore.customer.repository.UserRepository;
import com.estore.exception.EmailAlreadyExistsException;
import com.estore.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CustomerService {

    private final UserRepository userRepository;
    private final ProfileRepository profileRepository;

    public CustomerService(UserRepository userRepository, ProfileRepository profileRepository) {
        this.userRepository = userRepository;
        this.profileRepository = profileRepository;
    }

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new EmailAlreadyExistsException("Email déjà utilisé : " + request.getEmail());
        }
        User user = new User();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user = userRepository.save(user);

        Profile profile = new Profile();
        profile.setUser(user);
        profileRepository.save(profile);

        return new AuthResponse(user.getId(), user.getFirstName(), user.getLastName(), user.getEmail(), "Inscription réussie");
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("Utilisateur non trouvé"));
        if (!user.getPassword().equals(request.getPassword())) {
            throw new RuntimeException("Mot de passe incorrect");
        }
        return new AuthResponse(user.getId(), user.getFirstName(), user.getLastName(), user.getEmail(), "Connexion réussie");
    }

    public Profile getProfile(Long userId) {
        return profileRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Profil introuvable"));
    }

    @Transactional
    public Profile updateProfile(Long userId, ProfileRequest request) {
        Profile profile = profileRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Profil introuvable"));
        profile.setPhone(request.getPhone());
        profile.setAddress(request.getAddress());
        profile.setCity(request.getCity());
        profile.setCountry(request.getCountry());
        return profileRepository.save(profile);
    }
}
