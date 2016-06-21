package com.ethercamp.rest;

import com.ethercamp.model.InviteRequest;
import com.google.gson.Gson;
import org.springframework.boot.json.GsonJsonParser;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.Base64;
import java.util.Map;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RestController
public class SlackRestController {
    private static final String secret1 = "eG94cC0xMjky";
    private static final String secret2 = "OTQ1MzgyNC00NDc2NTA2";
    private static final String secret3 = "NDc1NC01MjYxNDUxMjgzMi03Y2NkOGEwZTAz";
    private static final String ALREADY_INVITED_ERROR = "already_invited";

/*
    POST /api/users.admin.invite HTTP/1.1
    Host: ether-camp-friends.slack.com
    Cache-Control: no-cache
    Content-Type: application/x-www-form-urlencoded

            set_active=true&token=xoxp-12929453824-12932086162-12932520786-4b193ac054&email=roman.mandeleil%40gmail.com
*/

    @RequestMapping(value = "/invite-slack" , consumes= APPLICATION_JSON_VALUE, method = POST)
    @ResponseBody
    public ResponseEntity<String> setRegistrationInfo(@RequestBody InviteRequest inviteRequest){
        Base64.Decoder decoder = Base64.getDecoder();
        String decodedSecret = new String(decoder.decode(secret1)) + new String(decoder.decode(secret2)) + new String(decoder.decode(secret3));
        System.out.println(inviteRequest.getEmail());

        RestTemplate restTemplate = new RestTemplate();
        String rpcEnd = String.format(
          "https://ether-camp-friends.slack.com/api/users.admin.invite?set_active=true&token=%s&email=%s",
                decodedSecret,
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

        if (response != null) {
            Map<String, Object> json = new GsonJsonParser().parseMap(response.getBody());
            if (!(boolean)json.getOrDefault("ok", false)) {
                String error = (String)json.getOrDefault("error", "");
                if (error.equals(ALREADY_INVITED_ERROR)) {
                    return new ResponseEntity<>(HttpStatus.CONFLICT);
                } else {
                    return new ResponseEntity<>(new Gson().toJson(error), HttpStatus.SERVICE_UNAVAILABLE);
                }
            }

            System.out.println(response.getBody());
        }

        return ResponseEntity.ok(new Gson().toJson("Thanks for joining our adventure"));
    }


}
