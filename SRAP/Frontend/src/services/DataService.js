import api from '@/services/Api'

export default {
    register (newUser) {
        return api().post('members', newUser)
            .then( function(response){
                //console.log(response)
                return response
                
            })
            .catch( function(error){
                // console.log(error.response)
                return error.response
            })
    },
    update (updateUser) {
        return api().put('members', updateUser)
            .then( function(response){
                console.log(response)
                return response
                
            })
            .catch( function(error){
                // console.log(error.response)
                return error.response
            })
    },
    newTransaction (newTransaction, memberId) {
        return api().post('members/'+memberId+'/accounts', newTransaction)
            .then( function(response){
                // console.log(response)
                return response
                
            })
            .catch( function(error){
                // console.log(error.response)
                return error.response
            })
    },
    search (request) {
        if (request.type == 'memberId'){
            return api().get('members?filter[where][memberid]='+request.memberid) 
        } else if (request.type == 'lastName'){
            return api().get('members?filter[order]=memberid ASC&filter[where][lastname]='+request.lastname)            
        } else if (request.type == 'none'){
            return api().get('members?filter[order]=memberid ASC')
        }
        
    },
    memberProfile (id) {
        return api().get('members/'+id)
    },
    memberAccounts (id) {
        return api().get('members/'+id+'/accounts')
    },
    accountDetails(id, accountnumber){
        return api().get('members/'+id+'/accounts?filter[order]=transactiondatetime DESC&filter[where][accountnumber]='+accountnumber)
    },
    capitalize (str) {
        return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    },
    convertDate (date) {
        var d = new Date(date).toISOString().slice(0,10); 
        return d
    },
    genJSON (data){
        var newJSON = [];
        var tempObj = {};
        data.forEach(function(item){
            var dt = new Date(item.transactiondatetime);
            var d = dt.toLocaleDateString();
            var t = dt.toLocaleTimeString();
            dt = d+" "+t;
            tempObj = {
                transactiondatetime: dt,
                accountnumber: item.accountnumber,
                accounttype: item.accounttype,
                credit: item.credit,
                debit: item.debit,
                operator: item.operator
            }
            newJSON.push(tempObj)
        })
        return newJSON
    },
    getAge (DOB){
        var today = new Date();
        var d2 = new Date(DOB);
        var diff = today.getTime()- d2.getTime();
        return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
    }

}