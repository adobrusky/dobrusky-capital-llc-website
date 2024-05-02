-- Create mailing list table to store emails
CREATE TABLE mailingList (
    emailID INT AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL,
    createdOnUTCDateTime DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (emailID),
    UNIQUE KEY (email)
);

-- Create contacts table to store contact information
CREATE TABLE contacts (
    contactID INT AUTO_INCREMENT,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    createdOnUTCDateTime DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (contactID),
    UNIQUE KEY (email)
);