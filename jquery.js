let playing = false;
let score;
let trailsleft;
let step;
let action;
let fruits = ['apple', 'cherry', 'grapes', 'pineapple', 'watermelon'];

$(document).ready(function(){
    //Click on start reset Button
    $('#startreset').click(function(){
        //if we are playing
            if(playing == true){
                window.location.reload();
            }
            else{
                //Initiate the game
                    playing = true;
                    $('#gameover').hide();

                //start the score counter
                    score = 0;
                    $('#score').html(score);
                
                //show trails left
                    $('#trailsleft').css("visibility","visible");
                    trailsleft = 3;
                    addHearts();
                
                //Change button text to reset game
                    $('#startreset').html('Reset Game');
                    
                //Start sending Fruits
                startAction();           
                }                    
    });

    //Slice a fruit
    $('#fruit1').mouseover(function(){
        score++;
        
        //Update Score
        $('#score').html(score);

        //Put audio on slice
        document.getElementById("slicesound").play();
        
        //Stop fruit and animate hide
        clearInterval(action);
        $('#fruit1').hide("explode", 500); //Slicing the fruit

        //Send a new fruit
        //Set timeout waits for 500ms and starts the function
        setTimeout(startAction, 500);   
    });
    


// All functions

    function addHearts(){
            $('#hearts').empty();
        for(i=0; i<trailsleft; i++){
            $('#hearts').append('<i class="fa fa-heart"></i>   ');
        }
    }

    function startAction(){
        //generate a fruit
        $('#fruit1').show();
        chooseFruit(); //choose a random fruit 
        $('#fruit1').css({'left': Math.round(Math.random() * 750), 'top' : -50 });
        
        //Random position
            
        //Generarte a random step
        step = Math.round(Math.random() * 5 + 1);
        
        //Move fruit by one step every 10ms
        action = setInterval(() => {

            //Move fruit down by step each time
            $('#fruit1').css('top', $('#fruit1').position().top + step); 

            //Check if the fruit is too low
            if($('#fruit1').position().top > $('#fruitcontainer').height()){
                //Check if any trails left
                    if(trailsleft > 1){
                        //generate a fruit
                        $('#fruit1').show();
                        chooseFruit(); //choose a random fruit 
                         $('#fruit1').css({'left': Math.round(Math.random() * 750), 'top' : -50 });
        
                        //Random position
            
                        //Generarte a random step
                        step = Math.round(Math.random() * 5 + 1);

                        //Reduce trails by 1
                        trailsleft--;

                        //Populate trailsleft box
                        addHearts();
                    }else{  
                        //we are not playing anymore
                        playing = false;

                        //Change text of Button to Start 
                        $('#startreset').html('Start');

                        //show gameover
                        $('#gameover').show();
                        $('#finalscore').html(score);
                        $('#trailsleft').css("visibility","hidden");
                        stopAction();
                    }
            }
        }, 10);       
    }

    //generate a random fruit 
    function chooseFruit(){
        $('#fruit1').attr('src' , 'images/'+fruits[Math.round(Math.random()*4)]+'.png');
    }

    //stop generation of fruit

    function stopAction(){
        clearInterval(action);
        $('#fruit1').hide();
    }
});    