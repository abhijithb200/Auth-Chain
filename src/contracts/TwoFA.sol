pragma solidity ^0.5.0;

contract TwoFA { 
    string public name = "AuthMeWithChain";
    
    //Struct
    struct Document{
        address owner;
        bool isValue;
        bool isRevoked;   
    }

    //mapping
    mapping(uint => mapping(address => Document)) public docs;

    //events
    event CreatedDocument (
        address owner,
        bool isValue,
        bool isRevoked
    );

    function createDocument(uint  _secret) public {
        docs[_secret][msg.sender] = Document(msg.sender,true,false);
        emit CreatedDocument(msg.sender,true,false);
    }

//     //check the docement exist,document is not revoked and document is intended to the specific organization
//     function isDocumentExist(uint _secret) public view returns (bool) {
//     return (docs[msg.sender].isValue == true && docs[msg.sender].isRevoked == false && docs[msg.sender].secret == _secret);
//   }
}