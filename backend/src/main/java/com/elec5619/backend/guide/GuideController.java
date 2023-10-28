package com.elec5619.backend.guide;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/guides")
public class GuideController {

    @Autowired
    private GuideService guideService;

    @GetMapping
    public ResponseEntity<List<Guide>> getGuides (@RequestParam Long gameId)
    {
        List<Guide> guides = guideService.getGuidesOfGame(gameId);
        return new ResponseEntity<>(guides, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Guide> addReview(@RequestBody GuideRequest request){
        Guide review = guideService.addGuide(request);

        return new ResponseEntity<>(review, HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity<String> deleteReviews(@RequestParam Long gameId) {
       guideService.deleteReviewsOfGame(gameId);

       return new ResponseEntity<>(HttpStatus.OK);
    }


}
