package com.ethercamp.rest;

import com.ethercamp.model.BasicResponse;
import com.ethercamp.model.InviteRequest;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RestController
public class SlackRestController {

/*
    POST /api/users.admin.invite HTTP/1.1
    Host: ether-camp-friends.slack.com
    Cache-Control: no-cache
    Content-Type: application/x-www-form-urlencoded

            set_active=true&token=xoxp-12929453824-12932086162-12932520786-4b193ac054&email=roman.mandeleil%40gmail.com
*/

    @RequestMapping(value = "/invite-slack" , consumes= APPLICATION_JSON_VALUE, method = POST)
    @ResponseBody
    public BasicResponse setRegistrationInfo(@RequestBody InviteRequest inviteRequest){

        System.out.println(inviteRequest.getEmail());

        RestTemplate restTemplate = new RestTemplate();
        String rpcEnd = String.format(
          "https://ether-camp-friends.slack.com/api/users.admin.invite?set_active=true&token=%s&email=%s",
                "xoxp-12929453824-12932086162-12932520786-4b193ac054",
                inviteRequest.getEmail()
                );

        HttpHeaders headers = new HttpHeaders();
        headers.add("Cache-Control", "no-cache");
        headers.add("Content-Type", "application/x-www-form-urlencoded");
        HttpEntity entity = new HttpEntity(headers);
        ResponseEntity<String> response = null;

        try {
            response = restTemplate.exchange(rpcEnd, HttpMethod.POST, entity, String.class);
        } catch (HttpClientErrorException ex)   {}

        if (response != null)
            System.out.println(response.getBody());

        BasicResponse basicResponse = new BasicResponse();
        basicResponse.setMessage("Thanks for joining our adventure");
        return basicResponse;
    }


}
