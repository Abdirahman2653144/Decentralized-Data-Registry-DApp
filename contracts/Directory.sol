// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Directory {
    struct Entry {
        uint256 entryId;
        string title;
        string details;
    }

    Entry[] private entries;
    uint256 private currentId = 1;

    event EntryCreated(uint256 entryId, string title, string details);

    // Create a new entry with validation checks
    function createEntry(string memory _title, string memory _details) public {
        // Validate that title and details are not empty
        require(bytes(_title).length > 0, "Title cannot be empty");
        require(bytes(_details).length > 0, "Details cannot be empty");

        // Add the new entry to the entries array
        entries.push(Entry(currentId, _title, _details));
        emit EntryCreated(currentId, _title, _details);

        // Increment currentId for the next entry
        currentId++;
    }

    // Fetch a specific entry by ID
    function fetchEntry(uint256 _entryId) public view returns (uint256, string memory, string memory) {
        require(_entryId > 0 && _entryId < currentId, "Entry not found");
        Entry memory entry = entries[_entryId - 1];
        return (entry.entryId, entry.title, entry.details);
    }

    // Get the total number of entries
    function totalEntries() public view returns (uint256) {
        return entries.length;
    }
}
