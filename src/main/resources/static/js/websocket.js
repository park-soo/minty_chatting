const url = "http://localhost:8087/getchatting";                // 소켓 주소
let stompClient;
let selectedUserOrGrup="10000000000000000";
let newMessages = new Map();



function connectToChat(userName) {                                  // userId
    console.log(userName);
    console.log("connecting to chat...")
    let socket = new SockJS(url + '/ws');// 소켓 연결
    stompClient = Stomp.over(socket);                                   //stomp 연결
    stompClient.connect({"X-Authorization":"Bearer s"}, function (frame) {
        console.log("connected to: " + frame);

        stompClient.subscribe("/topic/messages/"+userName, function (response) {
            let data = JSON.parse(response.body);

            console.log(data);

            console.log("selectedUserOrGrup = "+selectedUserOrGrup);

            console.log("data.fromLogin = "+data.fromLogin);

            if (selectedUserOrGrup == data.fromLogin) {
                console.log("selectedUserOrGrup === data.fromLogin")

                let messageTemplateHTML = "";
                messageTemplateHTML = messageTemplateHTML + '<div id="child_message" class="d-flex justify-content-end mb-4">'+
                '<div id="child_message" class="msg_cotainer_send">'+data.message+
                '</div>'+
                '</div>';
                $('#formMessageBody').append(messageTemplateHTML);
                console.log("append success")
            } else {
                newMessages.set(data.fromLogin, data.message);
                $('#userNameAppender_' + data.fromLogin).append('<span id="newMessage_' + data.fromLogin + '" style="color: red">+1</span>');

                console.log("kebuat")
                let messageTemplateHTML = "";
                messageTemplateHTML = messageTemplateHTML + '<div id="child_message" class="d-flex justify-content-end mb-4">'+
                '<div class="msg_cotainer_send">'+data.message+
                '</div>'+
                '</div>';
                console.log("append success")
            }
        },{});


        // $.get(url + "/fetchAllGroups/"+userName, function (response) {
        //     let groups = response;
        //     for (let i = 0; i < groups.length; i++) {
        //         // console.log(groups[i]['name'])
        //         stompClient.subscribe("/topic/messages/group/" + groups[i]["id"], function (response
        //         ) {
        //             let data = JSON.parse(response.body);
        //             console.log("selectedUserOrGrup = "+selectedUserOrGrup)
        //             console.log("data.group_id = "+data.groupId)
        //             console.log("------------------------------------ : masuk get message group")
        //             if (selectedUserOrGrup == data.groupId) {
        //                 console.log("selectedUserOrGrup === data.fromLogin")
        //
        //                 let messageTemplateHTML = "";
        //                 messageTemplateHTML = messageTemplateHTML + '<div id="child_message" class="d-flex justify-content-end mb-4">'+
        //                 '<div id="child_message" class="msg_cotainer_send">'+data.message+
        //                 '</div>'+
        //                 '</div>';
        //                 $('#formMessageBody').append(messageTemplateHTML);
        //                 console.log("append success")
        //             } else {
        //                 newMessages.set(data.groupId, data.message);
        //                 $('#userGroupAppender_' + data.groupId).append('<span id="newMessage_' + data.groupId + '" style="color: red">+1</span>');
        //
        //                 console.log("kebuat")
        //                 let messageTemplateHTML = "";
        //                 messageTemplateHTML = messageTemplateHTML + '<div id="child_message" class="d-flex justify-content-end mb-4">'+
        //                 '<div class="msg_cotainer_send">'+data.message+
        //                 '</div>'+
        //                 '</div>';
        //                 console.log("append success")
        //             }
        //         })
        //     }
        //
        //
        // });



    },onError);
}
function onError() {
    console.log("Disconed from console")
}

window.onload = function() {

    if (localStorage.getItem("userId") === null) {
        window.location.href = "http://localhost:8087";
        return false;
    }

    fetchAll();
    connectToChat(localStorage.getItem("userId"));


  };

function fetchAll() {
    var userId = localStorage.getItem("userId");

    console.log(userId);
    $.get(url + "/fetchAllUsers/"+userId, function (response) {
        console.log(response);

        let users = response;

        let usersTemplateHTML = "";
        for (let i = 0; i < users.length; i++) {
            console.log(users[i]['other'])
                if (userId==users[i]['other']){

                usersTemplateHTML = usersTemplateHTML + '<li class="active" id="child_message" onclick="formMessageLauch('+users[i]['my']+',\''+users[i]['myNickName']+'\',\'user\')" data-userid="'+users[i]['myNickName']+'" data-type="user">'+
                '<div class="d-flex bd-highlight">'+
                '<div class="img_cont">'+
                '<img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" class="rounded-circle user_img">'+
                '<span class="online_icon"></span>'+
                '</div>'+
                '<div class="user_info" id="userNameAppender_' + users[i]['myNickName'] + '">'+
                '<span>'+users[i]['myNickName']+'</span>'+
                '<p>'+users[i]['myNickName']+' is online</p>'+
                '</div>'+
                '</div>'+
                '</li>';
                } else  {

                    usersTemplateHTML = usersTemplateHTML + '<li class="active" id="child_message" onclick="formMessageLauch(\'' + users[i]['other'] + '\', \'' + users[i]['otherNickName'] + '\', \'user\', \'' + users[i]['title'] + '\', \'' + users[i]['content'] + '\', \'' + users[i]['price'] + '\', \'' + users[i]['thumbnail'] + '\')" data-userid="' + users[i]['otherNickName'] + '" data-type="user" data-thumbnail="' + users[i]['thumbnail'] + '" data-title="' + users[i]['title'] + '" data-content="' + users[i]['content'] + '" data-price="' + users[i]['price'] + '">' +
                        '<div class="d-flex bd-highlight">'+
                        '<div class="img_cont">'+
                        '<img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" class="rounded-circle user_img">'+
                        '</div>'+
                        '<div class="user_info" id="userNameAppender_' + users[i]['otherNickName'] + '">'+
                        '<span>'+users[i]['otherNickName']+'</span>'+
                        '</div>'+
                        '<div class="img_cont">'+
                        '</div>'+
                        '<div class="img_cont">'+
                        '<img src="https://storage.cloud.google.com/reboot-minty-storage/' + users[i]['thumbnail'] + '" class="rounded-circle user_img"/>' +
                        '</div>'+
                        '<div class="user_info" id="userNameAppender_' + users[i]['otherNickName'] + '">'+
                        '<span>제목'+users[i]['title']+'</span>'+
                        '<span>가격'+users[i]['price']+'</span>'+
                        '<p>내용'+users[i]['content']+'</p>'+
                        '</div>'+
                        '</div>'+
                        '</li>';
                }
        }
        $('#usersList').html(usersTemplateHTML);

    });

    // $.get(url + "/fetchAllGroups/"+userId, function (response) {
    //     let groups = response;
    //     let groupsTemplateHTML = "";
    //     for (let i = 0; i < groups.length; i++) {
    //         console.log(groups[i]['group_name'])
    //         groupsTemplateHTML = groupsTemplateHTML + '<li class="active" id="child_message" onclick="formMessageLauch('+groups[i]['id']+',\''+groups[i]['group_name']+'\',\'group\')" data-groupid="'+groups[i]['id']+'" data-type="group">'+
    //             '<div class="d-flex bd-highlight">'+
    //             '<div class="img_cont">'+
    //             '<img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" class="rounded-circle user_img">'+
    //             '<span class="online_icon"></span>'+
    //             '</div>'+
    //             '<div class="user_info" id="userGroupAppender_' + groups[i]['id'] + '">'+
    //             '<span>'+groups[i]['group_name']+'</span>'+
    //             '<p>'+groups[i]['group_name']+' is active</p>'+
    //             '</div>'+
    //             '</div>'+
    //             '</li>';
    //     }
    //     $('#groupList').html(groupsTemplateHTML);
    //
    // });
}



function sendMsgUser(from, text) {
    stompClient.send("/app/chat/" + selectedUserOrGrup, {}, JSON.stringify({
        fromLogin: from,
        message: text
    }));


}

// function sendMsgGroup(from, text) {
//     stompClient.send("/app/chat/group/" + selectedUserOrGrup, {}, JSON.stringify({
//         fromLogin: from,
//         message: text
//     }));
//
//
// }

function sendMessage(type) {
    let username = $('#userName').attr("data-id")
    let message=$('#message-to-send').val();
    var userId = localStorage.getItem("userId");
    selectedUserOrGrup=username;
    console.log("type :"+type)
    if(type==="user"){
        sendMsgUser(userId, message);
    }else if(type==="group"){
        sendMsgGroup(userId, message);
    }


    let messageTemplateHTML = "";
    messageTemplateHTML = messageTemplateHTML + '<div id="child_message" class="d-flex justify-content-start mb-4">'+
    '<div id="child_message" class="msg_cotainer">'+message+
    '</div>'+
    '</div>';
    $('#formMessageBody').append(messageTemplateHTML);
    console.log("append success")

    document.getElementById("message-to-send").value="";

}



function formMessageLauch(id,name,type,title,content,price,thumbnail){

    let buttonSend= document.getElementById("buttonSend");
    if(buttonSend!==null){
        buttonSend.parentNode.removeChild(buttonSend);
    }

    let nama=$('#formMessageHeader .user_info').find('span')

    nama.html("Chat With "+name +"제목"+ title +"내용"+ content + "가격"+price + '<img src="https://storage.cloud.google.com/reboot-minty-storage/' + thumbnail + '" alt="Thumbnail" class="rounded-circle user_img">');

    nama.attr("data-id",id);
    let isNew = document.getElementById("newMessage_" + id) !== null;
    if (isNew) {
        let element = document.getElementById("newMessage_" + id);
        element.parentNode.removeChild(element);


    }
    let username = $('#userName').attr("data-id");
    selectedUserOrGrup=username;

    let isHistoryMessage = document.getElementById("formMessageBody");
    if(isHistoryMessage!== null && isHistoryMessage.hasChildNodes()){
        isHistoryMessage.innerHTML="";

    }



    var userId = localStorage.getItem("userId");
    if(type==="user"){
        $.get(url + "/listmessage/"+userId+"/"+id, function (response) {
            console.log(response);
            let messages = response;
            let messageTemplateHTML = "";

            // 생성 날짜 기준으로 메시지와 상품 정보를 정렬
            messages.sort((a, b) => new Date(a.message.created_date_time) - new Date(b.message.created_date_time));

            for (let i = 0; i < messages.length; i++) {
                let message = messages[i].message;  // 메시지 정보
                let product = messages[i].product;  // 상품 정보

                if (message['message_from'] == userId) {
                    messageTemplateHTML += '<div id="child_message" class="d-flex justify-content-start mb-4">' +
                        '<div id="child_message" class="msg_cotainer">' + message['message_text'] +
                        '</div>' +
                        '</div>';
                } else {
                    messageTemplateHTML += '<div id="child_message" class="d-flex justify-content-end mb-4">' +
                        '<div id="child_message" class="msg_cotainer_send">' + message['message_text'] +
                        '</div>' +
                        '</div>';
                }

                // 상품 정보를 추가하여 템플릿에 표시 (상품 정보가 있는 경우에만 추가)
                if (product) {
                    messageTemplateHTML += '<div id="child_message" class="d-flex justify-content-start mb-4">' +
                        '<div id="child_message" class="product_info">' +
                        '<img src="https://storage.cloud.google.com/reboot-minty-storage/' + product['thumbnail'] + '" alt="Thumbnail" class="rounded-circle user_img">' + '<br>' +
                        '제목: ' + product['title'] + '<br>' +
                        '내용: ' + product['content'] +'<br>' +
                        '가격: ' + product['price']+
                        '</div>' +
                        '</div>';
                }
            }
            $('#formMessageBody').append(messageTemplateHTML);
        });

    }
    // else if(type==="group"){
    //     $.get(url + "/listmessage/group/"+id, function (response) {
    //         let messagesGroup = response;
    //         let messageGroupTemplateHTML = "";
    //         for (let i = 0; i < messagesGroup.length; i++) {
    //             // console.log(messagesGroup[i]['messages'])
    //             if(messagesGroup[i]['user_id']==userId){
    //                 messageGroupTemplateHTML = messageGroupTemplateHTML + '<div id="child_message" class="d-flex justify-content-start mb-4">'+
    //                 '<div id="child_message" class="msg_cotainer">'+messagesGroup[i]['messages']+
    //                 '</div>'+
    //                 '</div>';
    //             }else{
    //                 messageGroupTemplateHTML = messageGroupTemplateHTML + '<div id="child_message" class="d-flex justify-content-end mb-4">'+
    //                 '<div id="child_message" class="msg_cotainer_send">'+messagesGroup[i]['messages']+'</div>'+
    //                 '<p>'+messagesGroup[i]['nickname']+'</p>'+
    //                 '</div>';
    //             }
    //
    //         }
    //         $('#formMessageBody').append(messageGroupTemplateHTML);
    //     });
    //
    // }


    let dataType = type;

    let submitButton='<div class="input-group-append" id="buttonSend">'+
    '<button class="input-group-text send_btn" onclick="sendMessage(\''+dataType+'\')"><i class="fas fa-location-arrow"></i></button>'+
    '</div>';
    $('#formSubmit').append(submitButton)

}


function logout(){
history.back();

}



