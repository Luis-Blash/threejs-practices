// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Openzeppelin imports
import "@openzeppelin/contracts@4.4.2/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.4.2/access/Ownable.sol";
import "@openzeppelin/contracts@4.4.2/utils/Counters.sol";

// Creation of metavers luis
contract Metavers is ERC721, Ownable {

    // Constructor [Nombre, simbolo]
    constructor() ERC721("META", "MJG") {}

    // Counters to regulate the current amount ofNTF Tokens minted
    using Counters for Counters.Counter;
    Counters.Counters private supply;

    // Total number NTF available for creation
    uint256 public maxSupply = 100;

    // Cost to be paid for each NTF Token
    uint256 public cost = 1 ether;

    // Owner and its properties in The metavers
    mapping (address => Building []) NTFOwners;

    // Metavers buildings
    struct Building {
        string name;
        int8 w;
        int8 h;
        int8 d;
        int8 x;
        int8 y;
        int8 z;
    }

    // List of metavers builds
    Building[] public buildings;

    // Obtaings the buildings made in the metaverse
    function getBuildings() public view returns (Building [] memory){
        return buildings;
    }

    // Obtaings the buildings made in the metaverse
    function totalSupply() public view returns (uint256){
        return supply.current();
    }

    // Creation of the buildings as NTF Token in the metavers
    function mint(string memory _building_name, int8 _w, int8 _h, int8 _d, int8 _x ,int8 _y ,int8 _z) public payable {
        require(supply.current() <= maxSupply, "Max supply exceeded!");
        require(msg.value >= cost, "Insufficient funds!");
        supply.increment();
        _safeMint(msg.sender, supply.current());
        Building memory _newBuild = Building(_building_name, _w,_h,_d,_x,_y,_z);
        buildings.push(_newBuild);
        NTFOwners[msg.sender].push(_newBuild);
    }


}