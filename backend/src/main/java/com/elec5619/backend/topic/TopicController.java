package com.elec5619.backend.topic;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class TopicController {
    @Autowired
    private TopicRepository topicRepository;

    @GetMapping("/topics")
    public ResponseEntity<List<Topic>> getTopics() {

        List<Topic> allTopics = new ArrayList<>();
        topicRepository.findAll().forEach(allTopics::add);

//        if (allTopics.isEmpty()) {
//            return ResponseEntity.ok("No topics");
//        }

        return ResponseEntity.ok(allTopics);
    }

    @PostMapping("/topics")
    public void addTopic(@RequestBody Topic topic){
        topicRepository.save(topic);
    }

    @GetMapping("/topicsm")
    public String hi() {
        return "Hi";
    }
//
//    @GetMapping("/{id}")
//    public ResponseEntity<Budget> getSingleBudget(@PathVariable Long id){
//        Budget budget = budgetRepository.findById(id).orElse(null);
//        if (budget == null) {
//            return ResponseEntity.notFound().build();
//        }
//
//        return ResponseEntity.ok().build();
//    }
//
//    @DeleteMapping("/{id}")
//    public ResponseEntity<Void> deleteBudget(@PathVariable Long id) {
//        Budget budget = budgetRepository.findById(id).orElse(null);
//        if (budget == null) {
//            return ResponseEntity.notFound().build();
//        }
//        budgetRepository.delete(budget);
//        return ResponseEntity.ok().build();
//    }
//
//
//    @PutMapping("/{id}")
//    public ResponseEntity<Budget> updateBudget(@PathVariable Long id, @RequestBody Budget budgetDetails) {
//        Budget budget = budgetRepository.findById(id).orElse(null);
//        if (budget == null) {
//            return ResponseEntity.notFound().build();
//        }
//        budget.setCategory(budgetDetails.getCategory());
//        budget.setPeriod(budgetDetails.getPeriod());
//        budget.setStartDate(budgetDetails.getStartDate());
//        budget.setEndDate(budgetDetails.getEndDate());
//        budget.setBudgetLimit(budgetDetails.getBudgetLimit());
//        budget.setUsedAmount(budgetDetails.getUsedAmount());
//
//        Budget updatedBudget = budgetRepository.save(budget);
//        return ResponseEntity.ok(updatedBudget);
//    }

}
