package com.Reboot.Minty.chat.repository;

import com.Reboot.Minty.chat.Entity.Products;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductsRepository extends JpaRepository<Products, Long> {

}
