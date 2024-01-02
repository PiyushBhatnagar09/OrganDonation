// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

/*
In Solidity, when you declare a variable of type string within a struct, it is stored as a reference type by default. 
This means that it's a reference to a location in storage rather than a direct value. 
When you access or modify a string within the struct, you're working with a reference to the actual storage location.
*/
contract OrganChain {

    struct Recipient {
        //these all are storage references
        address recipientId;
        address hospitalId;
        string organ; 
        string bloodgroup;
        bool matchFound;
        bool exist; //tells whether patient currently exists or not
    }

    struct Donor {
        //these all are storage references
        address donorId;
        address recipientId;
        string organ;
        string bloodgroup;
        bool matchFound;
        bool exist;
    }

    struct Transplant {
        //these all are storage references
        address recipientId;
        address donorId;
        bool exist;
    }

    //creating maps of {address, struct}
    mapping(address => Recipient) Recipients;
    mapping(address => Donor) Donors;
    mapping(address => address[]) Hospital_Recipients; //mapping of hospital address-> {array of all recipients}
    mapping(address => Transplant) Transplants;

    //arrays
    address[] recipient_arr;
    address[] donor_arr;

    modifier checkRecipientExist(address _addr) {
        //if recipient exists then we don't execute the further code
        require(!Recipients[_addr].exist); //we can move to further statements only if inside of "require" evaluated to true
        _;
    }

    modifier checkDonorExist(address _addr) {
        //if donor exists then we don't execute the further code
        require(!Donors[_addr].exist);
        _;
    }

    function addDonor(
        address _donor_addr,
        string memory _organ,
        string memory _bloodgroup
    ) public checkDonorExist(_donor_addr) checkRecipientExist(_donor_addr) {
        Donor memory newDonor = Donor({
            donorId: _donor_addr,
            recipientId: address(0x0), //default id to show no recipient found currently during adding this donor
            organ: _organ,
            bloodgroup: _bloodgroup,
            matchFound: false,
            exist: true
        });

        Donors[_donor_addr] = newDonor;
        donor_arr.push(_donor_addr);
    }

    function getDonor(address _donor_addr) public view returns (string memory, string memory, bool, address)
    {
        require(Donors[_donor_addr].exist);
        
        return (
            Donors[_donor_addr].organ,
            Donors[_donor_addr].bloodgroup,
            Donors[_donor_addr].matchFound,
            Donors[_donor_addr].recipientId
        );
    }

    function addRecipient(
        address _recipient_addr,
        address _hospital_addr,
        string memory _organ,
        string memory _bloodgroup
    )
        public
        checkRecipientExist(_recipient_addr)
        checkDonorExist(_recipient_addr)
    {
        Recipient memory newRecipient = Recipient({
            recipientId: _recipient_addr,
            hospitalId: _hospital_addr,
            organ: _organ,
            bloodgroup: _bloodgroup,
            matchFound: false,
            exist: true
        });

        Recipients[_recipient_addr] = newRecipient;
        recipient_arr.push(_recipient_addr);
        Hospital_Recipients[_hospital_addr].push(_recipient_addr);
    }

    function getRecipient(
        address _recipient_addr
    )
        public
        view
        returns (address, string memory, string memory, bool)
    {
        require(Recipients[_recipient_addr].exist); //to ensure recipient exists
        return (
            Recipients[_recipient_addr].hospitalId,
            Recipients[_recipient_addr].organ,
            Recipients[_recipient_addr].bloodgroup,
            Recipients[_recipient_addr].matchFound
        );
    }

    function getRecipientCount(
        address _hospital_addr
    ) public view returns (uint256) {
        return (Hospital_Recipients[_hospital_addr].length);
    }

    //getting information of recipients whose matched donor is still not found for a particular hospital
    function getRecipientDetail(
        address _hospital_addr,
        uint256 i //index of the recipient address in the mapping of hospital -> array{recipients}
    )
        public
        view
        returns (address, string memory, string memory)
    {
        if (!Recipients[Hospital_Recipients[_hospital_addr][i]].matchFound) {
            return (
                Recipients[Hospital_Recipients[_hospital_addr][i]].recipientId,
                Recipients[Hospital_Recipients[_hospital_addr][i]].organ,
                Recipients[Hospital_Recipients[_hospital_addr][i]].bloodgroup
            );
        } else {
            return (
                address(0), 
                "",         
                ""          
            );
        }
    }

    function isMatchFound(address _recipient_addr) public view returns (bool) {
        return Recipients[_recipient_addr].matchFound;
    }

    function getMatchedDonor(
        address _recipient_addr
    ) public view returns (address) {
        return (Transplants[_recipient_addr].donorId);
    }

    //finding match forthe recipients from donor array
    function transplantMatch(address _recipient_addr) public {
        for (uint i = 0; i < donor_arr.length; i++) {
            //LEARN: we cannot directly compare two string storage references of ethereum smart contracts, so we need to compare the actual values stored at these locations using these functions
            if (
                !Donors[donor_arr[i]].matchFound &&
                (keccak256(abi.encodePacked(Recipients[_recipient_addr].organ)) == keccak256(abi.encodePacked(Donors[donor_arr[i]].organ))) &&
                (keccak256(abi.encodePacked(Recipients[_recipient_addr].bloodgroup)) == keccak256(abi.encodePacked(Donors[donor_arr[i]].bloodgroup)))
            ) {
                Transplants[_recipient_addr] = Transplant(
                    _recipient_addr,
                    donor_arr[i],
                    true
                );

                Donors[donor_arr[i]].recipientId = _recipient_addr;
                Recipients[_recipient_addr].matchFound = true;
                Donors[donor_arr[i]].matchFound = true;
            }
        }
    }
}
