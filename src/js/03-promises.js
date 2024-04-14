import Notiflix from 'notiflix';
function createPromise(position, delay) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const shouldResolve = Math.random() > 0.3;
          if (shouldResolve) {
            resolve({ position, delay });
          } else {
            reject({ position, delay });
          }
        }, delay);
      });
    }

    document.querySelector('.form').addEventListener('submit', function(event) {
      event.preventDefault();
      const formData = new FormData(this);
      const delay = Number(formData.get('delay'));
      const step = Number(formData.get('step'));
      const amount = Number(formData.get('amount'));

      let currentDelay = delay;

      for (let i = 1; i <= amount; i++) {
        createPromise(i, currentDelay)
          .then(({ position, delay }) => {
            Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
          })
          .catch(({ position, delay }) => {
            Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
          });

        currentDelay += step;
      }
    });