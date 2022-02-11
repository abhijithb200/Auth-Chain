const { assert } = require('chai');
const { web3 } = require('web3');
const TwoFA = artifacts.require("TwoFA");

require('chai')
.use(require('chai-as-promised'))
.should()

contract('TwoFA',([deployer , seller , buyer])=>{
    let twofa

    before(async ()=>{
        twofa = await TwoFA.deployed()
    })

    describe('deployment', async ()=>{
        it('deploys successfully', async()=>{
            const address = await twofa.address
            assert.notEqual(address,0x0)
            assert.notEqual(address,'')
            assert.notEqual(address,null)
            assert.notEqual(address,undefined)
        })
    })
    // describe('document', async ()=>{
    //     let result
    //     const web_secret = '1212442342342342123123123112123123123123123123123123123123123123123123123123123231233'
    //     const uniqueid = 1
    //     before(async ()=>{
    //         result = await twofa.createDocument(web_secret,uniqueid,{from:'0xf60A7688f29Efb3DC935f1C22345542891367b63'})
    //     })
    //     it('has a name',async()=>{
    //         const name = await twofa.docs(web_secret,uniqueid,'0xf60A7688f29Efb3DC935f1C22345542891367b63')
    //         // console.log(name)
    //     })
        
    //     // it('created',async()=>{
    //     //     const event =  result.logs[0].args
            
    //     // })

    //     // it('checked',async()=>{
    //     //     result = await twofa.isDocumentExist(1224234234234,{from:deployer})
    //     //     // console.log(result)
    //     // })
        
    // })

    describe('permission document', async ()=>{
        const admin = '0x9609D33CeA4eAC07F22343b4977FBD8b7A7fE0c5'
        const member1 = '0xf60A7688f29Efb3DC935f1C22345542891367b63'
        const web_secret = '1212442342342342123123123112123123123123123123123123123123123123123123123123123231233'
        
        it('registered admin',async()=>{
            const name = await twofa.registerAdmin(web_secret,{from:admin})
        })

        it('added member',async()=>{
            const name = await twofa.addMember(web_secret,member1,{from:member1})
            console.log(name)
        })

        
    })

})