  new Vue({
    el: '#app-vue', 

    data:{
      users: [], 
      nameUsers: ['nomadtv', 'OgamingSC2', 'chaotictabris', 'freecodecamp', 'nvidiafrance', 'blizzard', 'RobotCaleb', 'unitlost'], 
      apiKey: '?client_id=puyss7akb1pw4295zxh8m5bs2bxugrm', 
      relativePath: 'https://api.twitch.tv/kraken/', 
      query: '', 
      filterStatus: 'all'
    }, 

    created: function(){
     this.updateUsers(); 
   }, 

   methods:{
    getPathRequestChannels: function(userName){
      return this.relativePath + 'channels/' + userName + this.apiKey; 
    }, 

    getPathRequestStreams: function(userName){
      return this.relativePath + 'streams/' + userName + this.apiKey; 
    }, 

    extractName: function(url){
      return url.substr( url.lastIndexOf('/') + 1 )
    }, 

    updateUsers: function(){
      var self = this; 
      for(var a = 0; a < this.nameUsers.length; a++){
        $.get(this.getPathRequestChannels(this.nameUsers[a])).
        done(function(data){
          var name = self.extractName(data._links.self);
          setTimeout(function(){
            $.get(self.getPathRequestStreams(name)).
            done(function(sub_data){
             var user = {
                name   : name, 
                online : (sub_data.stream != null), 
                channel: data, 
                stream: sub_data.stream
              }; 
              self.users.push(user); 
            }); 
          }, 500); 
        }); 
      }
    }, 

    changeFilter: function(arg){
      this.filterStatus = arg; 
    }, 

    getCssClassItem: function(arg){
      return (arg) ? 'fa-circle-o' : 'fa-circle-o-notch'; 
    }, 

    getImgUrlByActivity: function(arg){
      if(!arg.online)
        return arg.channel.logo; 
        // else
          // return arg.
        }
      }, 

      computed:{
        usersComputed: function(){
          var aux = []; 

          for(var a = 0; a < this.users.length; a++){
            if(this.users[a].name.indexOf(this.query) != -1 || this.query == ''){

          // console.log(this.users[a].online); 

          if(this.users[a].online && this.filterStatus == 'online'){
            aux.push(this.users[a]); 
            continue; 
          }

          if(!this.users[a].online && this.filterStatus == 'offline'){
            aux.push(this.users[a]); 
            continue; 
          }

          if(this.filterStatus == 'all')
            aux.push(this.users[a]); 
        }
      }
      return aux;
    }, 
  }, 

}); 