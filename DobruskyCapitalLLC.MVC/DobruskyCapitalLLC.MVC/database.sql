-- Create database for Dobrusky Capital LLC
CREATE DATABASE DobruskyCapital_LLC;

-- Create mailing list table to store emails
CREATE TABLE MailingList (
    EmailID INT IDENTITY(1,1),
    Email VARCHAR(255) NOT NULL,
    CreatedOnUTCDateTime DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (EmailID),
    UNIQUE (Email)
);