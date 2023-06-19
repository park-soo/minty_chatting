package com.Reboot.Minty.chat.service;

import com.Reboot.Minty.chat.Entity.ChatRoom;
import com.Reboot.Minty.chat.Entity.Products;
import com.Reboot.Minty.chat.dto.ChatRoomDTO;
import com.Reboot.Minty.chat.dto.ProductsDTO;
import com.Reboot.Minty.chat.repository.ChatRoomRepository;
import com.Reboot.Minty.chat.repository.ProductsRepository;
import com.Reboot.Minty.member.entity.User;
import com.Reboot.Minty.member.service.UserService;
import com.Reboot.Minty.tradeBoard.entity.TradeBoard;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ChatRoomService {

    @Autowired
    ChatRoomRepository chatRoomRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private ProductsRepository productsRepository;

    public ChatRoom saveChatRoom(ChatRoomDTO chatRoomDTO, ProductsDTO productsDTO) {

        User my = userService.getUserInfoById(chatRoomDTO.getMyId());
        User other = userService.getUserInfoById(chatRoomDTO.getOtherId());
        TradeBoard tradeBoard = chatRoomDTO.getTradeBoard();

        System.out.println(my.getId());
        System.out.println(other.getId());
        System.out.println(my.getNickName());

        Products products = new Products();
        products.setOther(other);
        products.setMy(my);
        products.setTradeBoard(tradeBoard);
        products.setCreateTime(LocalDateTime.now());

        productsRepository.save(products);

        ChatRoom chatRoom = new ChatRoom();
        // 중복 체크
        if (my.getId().equals(other.getId())) {
            System.out.println("구매자와 판매자가 같아");
            throw new IllegalArgumentException("구매자와 판매자가 같은 경우 처리");
        }

        if (chatRoomRepository.existsByMyAndOther(my,other) || chatRoomRepository.existsByOtherAndMy(my,other)) {
            ChatRoom chatRoomBoard = chatRoomRepository.findByMyAndOther(my, other);
            chatRoomBoard.setTradeBoard(tradeBoard);
            chatRoomRepository.save(chatRoomBoard);
            return chatRoom;

        } else {
            chatRoom.setMy(my);
            chatRoom.setOther(other);
            chatRoom.setTradeBoard(tradeBoard);
            chatRoomRepository.save(chatRoom);
            return chatRoom;
        }
    }




    public List<ChatRoom> getChatRoomList(User userId) {
        List<ChatRoom> chatRoomList = chatRoomRepository.findByOtherOrMyOrderByIdDesc(userId,userId);

        return chatRoomList;
    }

}
