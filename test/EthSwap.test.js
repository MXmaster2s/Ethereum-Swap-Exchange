// using mocha (mochajs.org) and chai assertion library (chaijs.com) 

const { assert } = require('chai')

const Token = artifacts.require('Token')
const EthSwap = artifacts.require('EthSwap')

//configuring chai assertion library
require('chai')
    .use(require('chai-as-promised'))
    .should()

function tokens(n){
    return web3.utils.toWei(n, 'ether');

}

contract('EthSwap', ([deployer, investor]) => {

    //create global variable token and ethSwap
    let token, ethSwap

    //assign values to global variables token and ethSwap and transfer token into ethSwap account
    before(async () => {
        //fetching Token contract instance in variable token
        token = await Token.new()
        //fetching EthSwap contract instance in variable ethSwap
        ethSwap = await EthSwap.new(token.address)
        //transfer 1million token from token contract to ethSwap contract
        await token.transfer(ethSwap.address, tokens('1000000'))
    })

    //Testing Token Contract Deployment using chai assertion library
    describe('Token deployment', async() => {
        it('contract has a name', async() => {
            //fetching name of token contract in variable name 
            let name1 = await token.name();           
            //using function chai.assert.equal(actual, expected, "[message]") 
            //to test if function name is 'DApp Token'
            assert.equal(name1, 'DApp Token', "Token deployment test failed")
        })
    })

    //Testing EthSwap Contract Deployment using chai assertion library
    describe('EthSwap deployment', async() => {
        it('contract has a name', async() => {
            //fetching name of ethSwap contract in variable name 
            let name2 = await ethSwap.name();
            //using function chai.assert.equal(actual, expected, "[message]") 
            //to test if function name is 'EthSwap Instant Exchange'
            assert.equal(name2, 'EthSwap Instant Exchange', "ethSwap deployment test failed")
        })

        it('contract has tokens', async() => {
            let balance = await token.balanceOf(ethSwap.address);
            assert.equal(balance.toString(), tokens('1000000'), "Token Transfer Test Failed")
        })

    })

    describe('buyTokens', async() =>{
        let result

        before(async () => {
            //Purchase tokens before example
            result = await ethSwap.buyTokens({from: investor, value: web3.utils.toWei('1', 'ether')});
        })

        it('Allow users to instantly purchase tokens from ethSwap for a fixed price', async() => {
            //check investor token balance after purchase
            let investorBalance = await token.balanceOf(investor)
            assert.equal(investorBalance.toString(), tokens('100'), "Investor Balance Test Failed");

            let ethSwapBalance 
            //check token balance after purchase
            ethSwapBalance = await token.balanceOf(ethSwap.address)
            assert.equal(ethSwapBalance.toString(), tokens('999900'), "Token Balance Test Failed After Transfer");
            //check EthSwap Echange Token Balance after purchase
            ethSwapBalance = await web3.eth.getBalance(ethSwap.address)
            assert.equal(ethSwapBalance.toString(), web3.utils.toWei('1', 'Ether', "EthSwap Exchange Balance Test Failed After Transfer"));
        })
    })


})