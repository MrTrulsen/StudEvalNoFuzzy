package com.StudEval.StudEvalNoFuzzy.Interfaces;

import com.StudEval.StudEvalNoFuzzy.User.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {

    public Role findByRole(String role);
}
