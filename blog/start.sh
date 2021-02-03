#!/bin/bash
services=(
          "posts"
          "query" 
          "moderation" 
          "eventbus" 
          "comments" 
          "client"
        )

for service in ${services[@]}
do
gnome-terminal -- bash -c\
   "echo Starting $service service... ;\
    cd $service;\
    pwd;\
    source ~/.nvm/nvm.sh;\
    nvm use v14;
    yarn start;
    bash;"
done



