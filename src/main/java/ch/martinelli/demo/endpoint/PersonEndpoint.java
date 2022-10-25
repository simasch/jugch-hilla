package ch.martinelli.demo.endpoint;

import ch.martinelli.demo.entity.Person;
import ch.martinelli.demo.service.PersonService;
import dev.hilla.Endpoint;
import dev.hilla.Nonnull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import javax.annotation.security.RolesAllowed;
import java.util.Optional;
import java.util.UUID;

@Endpoint
@RolesAllowed("ADMIN")
public class PersonEndpoint {

    private final PersonService service;

    @Autowired
    public PersonEndpoint(PersonService service) {
        this.service = service;
    }

    @Nonnull
    public Page<@Nonnull Person> list(Pageable page) {
        return service.list(page);
    }

    public Optional<Person> get(@Nonnull UUID id) {
        return service.get(id);
    }

    @Nonnull
    public Person update(@Nonnull Person entity) {
        return service.update(entity);
    }

    public void delete(@Nonnull UUID id) {
        service.delete(id);
    }

    public int count() {
        return service.count();
    }

}
