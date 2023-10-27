package com.elec5619.backend.topic;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

@Repository
public interface TopicRepository extends CrudRepository<Topic, Long> {
    // getAllBudgets()
//    List<Topic> findByUserId(Long userId);

}
