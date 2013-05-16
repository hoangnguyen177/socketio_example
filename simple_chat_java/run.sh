#!/bin/sh
mvn clean compile
mvn exec:java -Dexec.mainClass="test.SimpleChat"  
