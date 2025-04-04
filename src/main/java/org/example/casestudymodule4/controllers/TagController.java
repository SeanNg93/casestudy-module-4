package org.example.casestudymodule4.controllers;

import org.example.casestudymodule4.model.Food;
import org.example.casestudymodule4.model.Tag;
import org.example.casestudymodule4.service.tagservice.TagService;
import org.example.casestudymodule4.service.foodtagservice.FoodTagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/tags")
public class TagController {

    @Autowired
    private TagService tagService;

    @Autowired
    private FoodTagService foodTagService;

    @PreAuthorize("hasAnyRole('ADMIN', 'SELLER')")
    @PostMapping
    public ResponseEntity<Tag> createTag(@RequestBody Map<String, String> requestBody) {
        String name = requestBody.get("name");

        if (name == null || name.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(null);
        }

        Tag newTag = tagService.createTag(name);
        return ResponseEntity.ok(newTag);
    }

    @GetMapping("/{tagName}/foods")
    public ResponseEntity<List<Food>> getFoodByTag(@PathVariable String tagName) {
        return ResponseEntity.ok(tagService.getFoodsByTagName(tagName));
    }
}
