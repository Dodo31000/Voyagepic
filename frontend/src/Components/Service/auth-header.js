
export default function headersAuth() {
    const user = JSON.parse(localStorage.getItem('user'));
  
    if (user) {
      return { 'Content-Type': 'application/json', Authorization: `Bearer ${user.token}` };
    } else {
      return {};
    }
}


  

