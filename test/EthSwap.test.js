// using mocha (mochajs.org) and chai assertion library (chaijs.com) 

const { assert } = require('chai')

const Token = artifacts.require('Token')
const EthSwap = artifacts.require('EthSwap')

//configuring chai assertion library
require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('EthSwap', (accounts) => {

    describe('EthSwap deployment', async() => {
        it('contract has a name', async() => {
            //fetching EthSwap contract instance in variable ethSwap
            let ethSwap = await EthSwap.new()

            //fetching name of ethSwap contract in variable name 
            const name = await ethSwap.name()
            
            //using function chai.assert.equal(actual, expected, "[message]") 
            //to test if function name is 'EthSwap Instant Exchange'
            assert.equal(name, 'EthSwap Instant Exchange', "ethSwap.name() is not fetched properly")
        })
    })
})