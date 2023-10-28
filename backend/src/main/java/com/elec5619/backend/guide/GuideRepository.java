package com.elec5619.backend.guide;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GuideRepository extends CrudRepository<Guide, Long> {
}
