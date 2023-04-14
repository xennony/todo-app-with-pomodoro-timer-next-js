function App () {

    const [state,setState] = React.useState({
  
      user: '',
  
      rememberMe: false
  
    })
  
  
  
    const ref = useRef(null)
  
   
  
    const handleChange = (event) => {
  
      const input = @t;
  
      const value = input.type === 'checkbox' ? input.checked : input.value;
  
   
  
      setState(Object.assign({}, state, {[input.name]: value }));
  
    };
  
   
  
   
  
    localStorage.setItem('foo', 'foo')
  
    const handleFormSubmit = () => {
  
      const { user, rememberMe } = state;
  
      localStorage.setItem('rememberMe', JSON.stringify(rememberMe));
  
  
  
      if (rememberMe) {
  
        localStorage.setItem('user', JSON.stringify(user));
  
      } else {
  
        localStorage.setItem('user', '');
  
      }
  
    };
  
    
  
     useEffect( () => {
  
      const rememberMe = localStorage.getItem('rememberMe') === 'true';
  
      const user = rememberMe ? JSON.parse(localStorage.getItem('user')) : '';
  
      setState({ user, rememberMe });
  
    },[])
  
  
  
   
  
      return (
  
        <form onSubmit={handleFormSubmit} ref={ref}>
  
          <label>
  
            User: <input name="user" value={state.user} onChange={handleChange}/>
  
          </label>
  
          <label>
  
            <input name="rememberMe" checked={state.rememberMe} onChange={handleChange} type="checkbox"/> Remember me
  
          </label>
  
          <button type="submit">Sign In</button>
  
        </form>
  
      );
  
  }
  
  