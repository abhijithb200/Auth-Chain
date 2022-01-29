pragma solidity ^0.5.0;

contract TwoFA { 
    string public name = "Auth-Chain";
    //Struct
    struct Document{
        address owner;
        bool isValue;
        bool isRevoked;   
    }

    //mapping
    //secret_key_of_organization ----> address ----> data
    mapping(uint => mapping(address => Document)) public docs;

    //events
    event CreatedDocument (
        address owner,
        bool isValue,
        bool isRevoked
    );

    function createDocument(uint256  _secret) public {
        docs[_secret][msg.sender] = Document(msg.sender,true,false);
        emit CreatedDocument(msg.sender,true,false);
    }


}