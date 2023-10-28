package com.elec5619.backend.guide;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/guides")
public class GuideController {

    @Autowired
    private GuideService guideService;

    @GetMapping
    public ResponseEntity<List<Guide>> getGuides (@RequestParam Optional<Long> rawgId, @RequestParam Optional<Long> userId)
    {
        List<Guide> guides = new ArrayList<>();

        if (rawgId.isPresent())
        {
            guides = guideService.getGuidesOfGame(rawgId.orElse(Long.parseLong("3328")));
        } else if (userId.isPresent()) {
            guides = guideService.getGuidesOfUser(userId.orElse(Long.parseLong("1")));
        }

        return new ResponseEntity<>(guides, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Guide> addGuide(@RequestBody GuideRequest request){
        Guide review = guideService.addGuide(request);

        return new ResponseEntity<>(review, HttpStatus.CREATED);
    }

    @DeleteMapping
    public ResponseEntity<String> deleteGuides(@RequestParam Long rawgId) {
       guideService.deleteGuidesOfGame(rawgId);

       return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteGuide(@PathVariable Long id) {
        guideService.deleteGuide(id);

        return new ResponseEntity<>(HttpStatus.OK);
    }


}
