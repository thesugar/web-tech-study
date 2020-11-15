#!/bin/bash

read -p "The second highest mountain in Japan is Mt. Yarigatake. Is that right? [y/n]" yn
if [ $yn = "n" ]; then
	echo Correct! The second highest mountain in Japan is Mt. Kitadake.
else
	echo Wrong! The second highest mountain in Japan is Mt. Kitadake.
fi
