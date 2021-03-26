import axios from 'axios'
import qs from 'qs'

describe.skip('check endpoints', () => {
  test('data has sent to email', done => {

    const data = qs.stringify({
      'test': 'test'
    });

    // console.log('data ' + data)

    const config = {
      // method: 'post',
      method: 'get',
      url: 'http://localhost:5050/mail',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data : data
    };

    axios(config)
      .then(function (response) {
        expect(response.status).toBe(200)
        expect(response.statusText).toBe('OK')
        expect(response.data).toBe('Data sent to email')
        done()
      })
      .catch(function ({response}) {
        console.log(response)
        const regexp = new RegExp(/(Endpoint not found (\d))/)
        // const errorMessage = JSON.parse(JSON.stringify(error)).message
        const errorMessage = error.message
        const errorStatusCodeGroup = +errorMessage.match(regexp)[2]
        
        expect(errorStatusCodeGroup).toBe(4)

        done()
      });
    
  }, 5000)

})
