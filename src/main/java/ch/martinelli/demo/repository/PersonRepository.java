package ch.martinelli.demo.repository;

import ch.martinelli.demo.entity.Person;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PersonRepository extends JpaRepository<Person, UUID> {

}
