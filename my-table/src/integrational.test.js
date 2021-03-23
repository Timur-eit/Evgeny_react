import axios from 'axios'
import qs from 'qs'

describe('check endpoints', () => {
  test('data has sent to email', done => {

    const data = qs.stringify({
      'test': 'test'
    });

    const config = {
      method: 'post',
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
      .catch(function (error) {

        done()
      });
    
  }, 5000)

})
