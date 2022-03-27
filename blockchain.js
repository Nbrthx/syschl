const senc = require("crypto-js").SHA256

class Block{
    constructor(index, data, prevHash){
        this.index = index
        this.data = data
        this.timestamp = new Date().toJSON()
        this.prevHash = prevHash
        this.hash = this.calcHash()
        this.nonce = 0
    }

    calcHash(){
        return senc(this.index+JSON.stringify(this.data)+this.time+this.prevHash+this.nonce).toString()
    }

    mined(){
        while(this.hash.substring(0,2) !== "3b"){
            this.nonce += 1
            this.hash = this.calcHash()
        }
        //console.log("Mined with hash "+this.hash+" in "+this.nonce+" nonce")
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.gensBlock()]
    }

    gensBlock(){
        return new Block(0, {}, "0")
    }
    latestBlock(){
        return this.chain[this.chain.length-1]
    }
    addBlock(index, data){
        const prevHash = this.latestBlock().hash
        const newBlock = new Block(index, data, prevHash)
        newBlock.mined()
        this.chain.push(newBlock)
    }
    isValidChain(){
        for(let i = 1; i < this.chain.length; i++){
            if(this.chain[i].hash !== this.chain[i].calcHash()) return false
            if(this.chain[i].prevHash !== this.chain[i-1].hash) return false
        }
        return true
    }
}

const tada = new Blockchain()
tada.addBlock(1, { name: "nbrthx" })
tada.addBlock(2, { name: "husain" })

tada.chain[1].data.name = "kian"
tada.chain[1].hash = tada.chain[1].calcHash()

console.log("Is Chain Valid "+tada.isValidChain())

console.log(JSON.stringify(tada, null, 2))