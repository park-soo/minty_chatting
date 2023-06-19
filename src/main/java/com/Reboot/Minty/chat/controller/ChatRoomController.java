package com.Reboot.Minty.chat.controller;

import com.Reboot.Minty.chat.Entity.ChatRoom;
import com.Reboot.Minty.chat.dto.ChatRoomDTO;
import com.Reboot.Minty.chat.dto.ProductsDTO;
import com.Reboot.Minty.chat.service.ChatRoomService;
import com.Reboot.Minty.chat.service.ProductsService;
import com.Reboot.Minty.member.entity.User;
import com.Reboot.Minty.member.service.UserService;
import com.Reboot.Minty.tradeBoard.entity.TradeBoard;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Controller
public class ChatRoomController {

    @Autowired
    private UserService userService;

    @Autowired
    private ChatRoomService chatRoomService;




    @PostMapping("/chatRoom")
    public String chatRoom(@RequestBody TradeBoard tradeBoard, HttpSession session, ChatRoomDTO chatRoomDTO, ProductsDTO productsDTO) {

        System.out.println(tradeBoard.getUser().getId());
        System.out.println(tradeBoard.getContent());

            Long my = userService.getUserInfoById((Long) session.getAttribute("userId")).getId();
            Long other = userService.getUserInfoById(tradeBoard.getUser().getId()).getId();

        System.out.println(tradeBoard.getUser().getId());
        System.out.println(tradeBoard.getContent());
        System.out.println(my);

        chatRoomDTO.setMyId(my);
        chatRoomDTO.setOtherId(other);
        chatRoomDTO.setTradeBoard(tradeBoard);

        productsDTO.setMyId(my);
        productsDTO.setOtherId(other);
        productsDTO.setTradeBoard(tradeBoard);
        chatRoomService.saveChatRoom(chatRoomDTO,productsDTO);


        return "redirect:/chatRoom";
    }


    @GetMapping("/chatRoom")
    public String getChatRoom(HttpServletRequest request, Model model) {

        HttpSession session = request.getSession();

        User userId = userService.getUserInfoById((Long) session.getAttribute("userId"));

        List<ChatRoom> chatRoomList = chatRoomService.getChatRoomList(userId);

        model.addAttribute("chatRoomLists",chatRoomList);

        return "chat/chatRoom";
    }







}
