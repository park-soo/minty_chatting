package com.Reboot.Minty.chat.service;

import com.Reboot.Minty.chat.Entity.Products;
import com.Reboot.Minty.chat.dto.ProductsDTO;
import com.Reboot.Minty.chat.repository.ProductsRepository;
import com.Reboot.Minty.member.entity.User;
import com.Reboot.Minty.member.service.UserService;
import com.Reboot.Minty.tradeBoard.entity.TradeBoard;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
public class ProductsService {

    @Autowired
    JdbcTemplate jdbcTemplate;

    public List<Map<String, Object>> getListProducts(@PathVariable("from") Integer from, @PathVariable("to") Integer to) {

        return jdbcTemplate.queryForList("SELECT p.*, t.title, t.content, t.price, t.thumbnail FROM products p " +
                "JOIN tradeboard t ON p.trade_board_id = t.id " +
                "WHERE (p.my = ? AND p.other = ?) OR (p.other = ? AND p.my = ?) " +
                "ORDER BY p.created_date_time ASC", from, to, from, to);

    }
}
