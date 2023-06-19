package com.Reboot.Minty.chat.service;

import com.Reboot.Minty.chat.Entity.Products;
import com.Reboot.Minty.chat.dto.ProductsDTO;
import com.Reboot.Minty.chat.repository.ProductsRepository;
import com.Reboot.Minty.member.entity.User;
import com.Reboot.Minty.member.service.UserService;
import com.Reboot.Minty.tradeBoard.entity.TradeBoard;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class ProductsService {

    @Autowired
    private static UserService userService;

    @Autowired
    private ProductsRepository productsRepository;

    public void saveProduct(ProductsDTO productsDTO) {

        User my = userService.getUserInfoById(productsDTO.getMyId());
        User other = userService.getUserInfoById(productsDTO.getOtherId());
        TradeBoard tradeBoard = productsDTO.getTradeBoard();

        Products products = new Products();
        products.setOther(other);
        products.setMy(my);
        products.setTradeBoard(tradeBoard);
        products.setCreateTime(LocalDateTime.now());

        productsRepository.save(products);

    }
}
