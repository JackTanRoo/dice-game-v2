App = {
  web3Provider: null,
  contracts: {},

  init: async function() {
    return await App.initWeb3();
  },

  initWeb3: async function() {
    /*
     * Replace me...
     */

     // if (typeof web3 !== 'undefined') {
     //  // If a web3 instance is already provided by Meta Mask.
     //    App.web3Provider = web3.currentProvider;
     //    web3 = new Web3(web3.currentProvider);
     // } else {
     //    App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
     //    web3 = new Web3(App.web3Provider);
     // }

     if (window.ethereum) {
       App.web3Provider = window.ethereum;
       try {
         // Request account access
         await window.ethereum.enable();
       } catch (error) {
         // User denied account access...
         console.error("User denied account access")
       }
     }
     // Legacy dapp browsers...
     else if (window.web3) {
       App.web3Provider = window.web3.currentProvider;
     }
     // If no injected web3 instance is detected, fall back to Ganache
     else {
       App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
     }
     web3 = new Web3(App.web3Provider);


    return App.initContract();
  },

  initContract: function() {
    /*
     * Replace me...
     */
     $.getJSON("Dice.json", function(dice) {
      // Instantiate a new truffle contract from the artifact
        App.contracts.Dice = TruffleContract(dice);
        // Connect provider to interact with contract
        App.contracts.Dice.setProvider(App.web3Provider);
        // App.listenForEvents();
        // return App.render();
      });
  },

  takeTurn : function(){
    App.contracts.Dice.deployed().then(function(instance) {
      return instance.takeTurn({ from: App.account });
    }).then(function(result) {
      console.log("I am result", result);
    }).catch(function(err) {
      console.error(err);
    });
  },


  bindEvents: function() {
    $(document).on('click', '.btn-adopt', App.handleAdopt);
  },

  markAdopted: function() {
    /*
     * Replace me...
     */
  },

  handleAdopt: function(event) {
    event.preventDefault();

    var petId = parseInt($(event.target).data('id'));

    /*
     * Replace me...
     */
  }

};

$(function() {
  $(window).load(function() {
      App.init();

      var player1PubAddress;
      var player2PubAddress;
      // const myContract = new web3.eth.Contract(myAbi, myContractAddress);
      console.log("App object", App.contracts.Dice)
      // myContract.methods.init().call().then((jsonRpcResult) => {
      // htmlLabel.innerHTML = jsonRpcResult;
      $('.start-game').on('click', function() {
             player1PubAddress = $('#address1').val();
             player2PubAddress = $('#address2').val();
             console.log("start game clicked with: ", player1PubAddress, player2PubAddress);

             // myContract.methods.startGame(player1PubAddress, player2PubAddress).call().then((jsonRpcResult) => {
             //   $('#status').text("Game Started. The players are: ");
             //   $('#player1').text("Player 1: " + jsonRpcResult[0]);
             //   $('#player2').text("Player 2: " + jsonRpcResult[1]);
             // });
             //
             // myContract.methods.takeTurn().call().then((jsonRpcResult) => {
             //   console.log("I am the return: ", );
             // });

      });
  });
});
