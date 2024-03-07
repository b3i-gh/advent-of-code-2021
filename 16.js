export function solvePart1(input) {
    const start = performance.now();
    const memoryInfo = process.memoryUsage();
    
    var binInput = hexToBinary(input);
    const startingPacket = new Packet(binInput); 
    
    const end = performance.now();
    console.log("Execution time:", end - start, "milliseconds");
    console.log("Memory usage:", memoryInfo);
    return sumVersions(startingPacket);
}

export function solvePart2(input) {
    const start = performance.now();
    const memoryInfo = process.memoryUsage();

    var binInput = hexToBinary(input);
    const startingPacket = new Packet(binInput); 

    const end = performance.now();
    console.log("Execution time:", end - start, "milliseconds");
    console.log("Memory usage:", memoryInfo);

    return startingPacket.decodeValue();
}

function hexToBinary(hex) {
    return [...hex]
    .map((n) => parseInt(n, 16)
    .toString(2)
    .padStart(4, "0"))
    .join``;
}

class Packet {
    constructor(bitString){
        this.bitString = bitString;
        this.version = this.getVersion();
        this.typeID =  this.getTypeID();
        this.isLiteral = this.typeID == 4;
        this.value = this.getValue();
        this.lengthTypeID = this.getLengthTypeID();
        this.subpacketsLength = this.getSubpacketsLength();
        this.subpacketsNumber = this.getSubpacketsNumber();
        this.subpackets = this.getSubPackets();
        this.headerLength = this.getHeaderLength();
        this.length = this.getLength();
    }

    getVersion(){
        return parseInt(this.bitString.slice(0,3), 2);
    }

    getTypeID(){
        return parseInt(this.bitString.slice(3,6), 2);
    }

    getValue(){
        return this.bitString.slice(6);
    }

    getLengthTypeID(){
        if(this.isLiteral)
            return null;
        else 
            return parseInt(this.bitString.slice(6,7));
    }
    
    getSubpacketsLength(){
        if(this.isLiteral || this.lengthTypeID == 1)
            return null;
        else 
            return parseInt(this.bitString.slice(7,22), 2);
    }

    getSubpacketsNumber(){
        if(this.isLiteral || this.lengthTypeID == 0)
            return null;
        else 
            return parseInt(this.bitString.slice(7,18), 2);
    }

    decodeValue(){
        if(!this.isLiteral){
            switch (this.typeID){
                case 0:
                    return this.subpackets.reduce((acc, curr) => acc + curr.decodeValue(), 0);
                case 1:
                    return this.subpackets.reduce((acc, curr) => acc * curr.decodeValue(), 1);
                case 2:
                    return this.subpackets.reduce((acc, curr) => acc < curr.decodeValue() ? acc : curr.decodeValue(), Infinity);
                case 3:
                    return this.subpackets.reduce((acc, curr) => acc > curr.decodeValue() ? acc : curr.decodeValue(), 0);
                case 5:
                    return this.subpackets[0].decodeValue() > this.subpackets[1].decodeValue() ? 1 : 0;
                case 6:
                    return this.subpackets[0].decodeValue() < this.subpackets[1].decodeValue() ? 1 : 0;
                case 7:
                    return this.subpackets[0].decodeValue() == this.subpackets[1].decodeValue() ? 1 : 0;
            }
        } else {
            const bits = this.getValue().split('');
            let decodedValue = '';
            let i = 0;
            while(true){
                decodedValue += bits[i+1] + bits[i+2] + bits[i+3] + bits[i+4];
                if(bits[i] == 0) // last bit of this packet
                    break;
                else
                    i += 5;
            }
            return parseInt(decodedValue, 2);
        }
    }

    getSubPackets(){
        if(this.isLiteral)
            return null;

        var subpackets = [];
        if(this.lengthTypeID == 0){ // subpackets based on length limit
            var l = 0;
            var s = this.value.slice(16);
            while(l < this.subpacketsLength){
                const subpacketTypeID = parseInt(s.substring(3,6), 2);
                if(subpacketTypeID == 4){ // add literal packet to the subpackets
                    const subpacketLength = this.findLiteralSubPacketLength(s);
                    const subpacket = new Packet(s.substring(0,subpacketLength));
                    subpackets.push(subpacket);
                    s = s.slice(subpacketLength);
                    l += subpacketLength;
                } else {
                    const subpacket = new Packet(s);
                    subpackets.push(subpacket);
                    s = s.slice(subpacket.length);
                    l += subpacket.length
                }
            }
        }
        else { // subpackets based on packet number
            let i = 0;
            var s = this.value.slice(12);
            while(i < this.subpacketsNumber){
                const subpacketTypeID = parseInt(s.substring(3,6), 2);
                if(subpacketTypeID == 4){ // add literal packet to the subpackets
                    const subpacketLength = this.findLiteralSubPacketLength(s);
                    const subpacket = new Packet(s.substring(0,subpacketLength));
                    subpackets.push(subpacket);
                    s = s.slice(subpacketLength);
                } else {
                    const subpacket = new Packet(s);
                    s = s.slice(subpacket.length);
                    subpackets.push(subpacket);
                }
                i++;
            }
        }
        return subpackets;
    }

    findLiteralSubPacketLength(s){
        const value = s.slice(6).split('');
        let i = 0;
        while(true){
            if(value[i] == 0){
                i+=5;
                break;
            }
            i+=5;
        }
        return 6 + i;
    }

    buildOperationalSubpacket(s){
        const subpacket = new Packet(s);
        return [subpacket.length, subpacket];
    }

    getLength(){
        let l = this.headerLength;
        if(this.isLiteral)
            return l += this.value.length;
        else{
            return this.subpackets.reduce((acc, subpacket) => acc + subpacket.getLength(),l)
        }
    }

    getHeaderLength(){
        if(this.isLiteral)
            return 6;
        else {
            if(this.lengthTypeID == 1)
                return 18;
            else 
                return 22;
        }
    }
}

function sumVersions(packet){
    let s = packet.version;
    if(packet.isLiteral)
        return s;
    return packet.subpackets.reduce((acc, subpacket) => acc +sumVersions(subpacket), s);
}