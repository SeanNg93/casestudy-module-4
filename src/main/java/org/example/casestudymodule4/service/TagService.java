package org.example.casestudymodule4.service;

import org.example.casestudymodule4.model.Tag;
import org.example.casestudymodule4.repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TagService {
    @Autowired
    private TagRepository tagRepository;

    public List<Tag> getAllTags() {
        return tagRepository.findAll();
    }

    public Tag createTag(String name) {
        if (tagRepository.existsByName(name)) {
            throw new RuntimeException("Tag already exists");
        }

        Tag tag = new Tag();
        tag.setName(name);
        tag.setSlug(generateSlug(name)); // ✅ Ensure slug is set
        tag.setAddCount(0);
        tag.setViewCount(0);

        return tagRepository.save(tag);
    }

    private String generateSlug(String name) {
        return name.toLowerCase().replaceAll("\\s+", "-");  // Converts "Italian Food" → "italian-food"
    }
}
