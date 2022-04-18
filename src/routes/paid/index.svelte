<script lang="ts">
  import { TabContent, TabPane } from 'sveltestrap'
</script>

<style>
  .list-item {
    background: var(--opacity-bg);
    border-radius: 15px;
    padding: 30px 10px;
    margin: 0 0 25px 0;
  }
</style>

<h1>Latest sales</h1>

<section class="sales">

  <div class="d-flex flex-direction-row align-items-center justify-content-end">
    <p class="px-3">Sale stats range</p>
    <div class="button px-3 d-flex">
      1 day &nbsp;
      <svg style="width: 12px;" width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.30692 7.70389L0.287332 1.68411C-0.0957842 1.30118 -0.0957842 0.680324 0.287333 0.297579C0.670108 -0.0851964 1.29093 -0.0851964 1.67368 0.297579L7.0001 5.62415L12.3263 0.297735C12.7093 -0.0850411 13.33 -0.085041 13.7128 0.297735C14.0957 0.68051 14.0957 1.30134 13.7128 1.68427L7.69312 7.70404C7.50164 7.89543 7.25094 7.99102 7.00013 7.99102C6.74919 7.99102 6.49831 7.89524 6.30692 7.70389Z" fill="currentColor"/>
      </svg>
    </div>
  </div>

  <div class="row py-5 text-center">
    <div class="col-12 col-md-3">
      <div class="list-item">
        <div class="fs-6 pb-2">Total sale volume</div>
        <h3>
          <span>
            <svg class="near-icon" style="width: 21px;" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.43596 24.75C3.82197 24.75 4.20343 24.665 4.55434 24.5007C4.90525 24.3365 5.21735 24.0969 5.46937 23.7983L23.8385 2.03667C23.5975 1.64261 23.2621 1.31771 22.8641 1.09261C22.4661 0.867504 22.0186 0.749598 21.5636 0.750001C21.1797 0.750066 20.8004 0.834149 20.451 0.996586C20.1017 1.15902 19.7905 1.39604 19.5384 1.69167L1.07617 23.325C1.30799 23.757 1.64944 24.1173 2.06467 24.3681C2.4799 24.6188 2.95358 24.7507 3.43596 24.75V24.75Z" fill="url(#paint0_linear_3551:766)" />
              <path d="M3.49333 24.75C3.93054 24.7499 4.3614 24.6453 4.75 24.445V6.27835L19.325 23.7683C19.5827 24.0764 19.905 24.324 20.2691 24.4936C20.6331 24.6632 21.03 24.7508 21.4317 24.75H22.0067C22.7342 24.75 23.432 24.461 23.9465 23.9465C24.461 23.432 24.75 22.7342 24.75 22.0067V3.49335C24.75 2.76577 24.461 2.068 23.9465 1.55352C23.432 1.03905 22.7342 0.750018 22.0067 0.750018C21.5697 0.748415 21.1387 0.851876 20.75 1.05168V19.2267L6.175 1.73668C5.91774 1.42774 5.59565 1.1792 5.23158 1.00868C4.8675 0.838168 4.47036 0.749857 4.06833 0.750018H3.49333C2.76576 0.750018 2.06798 1.03905 1.5535 1.55352C1.03903 2.068 0.75 2.76577 0.75 3.49335V22.0067C0.75 22.7342 1.03903 23.432 1.5535 23.9465C2.06798 24.461 2.76576 24.75 3.49333 24.75V24.75Z" fill="currentColor" />
              <defs>
                <linearGradient id="paint0_linear_3551:766" x1="1.53475" y1="23.945" x2="23.9215" y2="2.02301" gradientUnits="userSpaceOnUse">
                  <stop offset="0.21" stop-color="currentColor" />
                  <stop offset="0.42" stop-color="currentColor" stop-opacity="0" />
                  <stop offset="0.59" stop-color="currentColor" stop-opacity="0" />
                  <stop offset="0.81" stop-color="currentColor" />
                </linearGradient>
              </defs>
            </svg>
          </span>
          101.7
        </h3>
        <span>$808.18</span>
      </div>
    </div>
    <div class="col-12 col-md-3">
      <div class="list-item">
        <div class="fs-6 pb-2">Total number of sales</div>
        <h3>16</h3>
        <span>07 Oct - 08 Oct</span>
      </div>
    </div>
    <div class="col-12 col-md-3">
      <div class="list-item">
        <div class="fs-6 pb-2">Top sale</div>
        <h3>
          <span>
            <svg class="near-icon" style="width: 21px;" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.43596 24.75C3.82197 24.75 4.20343 24.665 4.55434 24.5007C4.90525 24.3365 5.21735 24.0969 5.46937 23.7983L23.8385 2.03667C23.5975 1.64261 23.2621 1.31771 22.8641 1.09261C22.4661 0.867504 22.0186 0.749598 21.5636 0.750001C21.1797 0.750066 20.8004 0.834149 20.451 0.996586C20.1017 1.15902 19.7905 1.39604 19.5384 1.69167L1.07617 23.325C1.30799 23.757 1.64944 24.1173 2.06467 24.3681C2.4799 24.6188 2.95358 24.7507 3.43596 24.75V24.75Z" fill="url(#paint0_linear_3551:766)" />
              <path d="M3.49333 24.75C3.93054 24.7499 4.3614 24.6453 4.75 24.445V6.27835L19.325 23.7683C19.5827 24.0764 19.905 24.324 20.2691 24.4936C20.6331 24.6632 21.03 24.7508 21.4317 24.75H22.0067C22.7342 24.75 23.432 24.461 23.9465 23.9465C24.461 23.432 24.75 22.7342 24.75 22.0067V3.49335C24.75 2.76577 24.461 2.068 23.9465 1.55352C23.432 1.03905 22.7342 0.750018 22.0067 0.750018C21.5697 0.748415 21.1387 0.851876 20.75 1.05168V19.2267L6.175 1.73668C5.91774 1.42774 5.59565 1.1792 5.23158 1.00868C4.8675 0.838168 4.47036 0.749857 4.06833 0.750018H3.49333C2.76576 0.750018 2.06798 1.03905 1.5535 1.55352C1.03903 2.068 0.75 2.76577 0.75 3.49335V22.0067C0.75 22.7342 1.03903 23.432 1.5535 23.9465C2.06798 24.461 2.76576 24.75 3.49333 24.75V24.75Z" fill="currentColor" />
              <defs>
                <linearGradient id="paint0_linear_3551:766" x1="1.53475" y1="23.945" x2="23.9215" y2="2.02301" gradientUnits="userSpaceOnUse">
                  <stop offset="0.21" stop-color="currentColor" />
                  <stop offset="0.42" stop-color="currentColor" stop-opacity="0" />
                  <stop offset="0.59" stop-color="currentColor" stop-opacity="0" />
                  <stop offset="0.81" stop-color="currentColor" />
                </linearGradient>
              </defs>
            </svg>
          </span>
          3908
        </h3>
        <span>$32013</span>
      </div>
    </div>
    <div class="col-12 col-md-3">
      <div class="list-item">
        <div class="fs-6 pb-2">Total sale volume</div>
        <h3>
          <span>
            <svg class="near-icon" style="width: 21px;" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.43596 24.75C3.82197 24.75 4.20343 24.665 4.55434 24.5007C4.90525 24.3365 5.21735 24.0969 5.46937 23.7983L23.8385 2.03667C23.5975 1.64261 23.2621 1.31771 22.8641 1.09261C22.4661 0.867504 22.0186 0.749598 21.5636 0.750001C21.1797 0.750066 20.8004 0.834149 20.451 0.996586C20.1017 1.15902 19.7905 1.39604 19.5384 1.69167L1.07617 23.325C1.30799 23.757 1.64944 24.1173 2.06467 24.3681C2.4799 24.6188 2.95358 24.7507 3.43596 24.75V24.75Z" fill="url(#paint0_linear_3551:766)" />
              <path d="M3.49333 24.75C3.93054 24.7499 4.3614 24.6453 4.75 24.445V6.27835L19.325 23.7683C19.5827 24.0764 19.905 24.324 20.2691 24.4936C20.6331 24.6632 21.03 24.7508 21.4317 24.75H22.0067C22.7342 24.75 23.432 24.461 23.9465 23.9465C24.461 23.432 24.75 22.7342 24.75 22.0067V3.49335C24.75 2.76577 24.461 2.068 23.9465 1.55352C23.432 1.03905 22.7342 0.750018 22.0067 0.750018C21.5697 0.748415 21.1387 0.851876 20.75 1.05168V19.2267L6.175 1.73668C5.91774 1.42774 5.59565 1.1792 5.23158 1.00868C4.8675 0.838168 4.47036 0.749857 4.06833 0.750018H3.49333C2.76576 0.750018 2.06798 1.03905 1.5535 1.55352C1.03903 2.068 0.75 2.76577 0.75 3.49335V22.0067C0.75 22.7342 1.03903 23.432 1.5535 23.9465C2.06798 24.461 2.76576 24.75 3.49333 24.75V24.75Z" fill="currentColor" />
              <defs>
                <linearGradient id="paint0_linear_3551:766" x1="1.53475" y1="23.945" x2="23.9215" y2="2.02301" gradientUnits="userSpaceOnUse">
                  <stop offset="0.21" stop-color="currentColor" />
                  <stop offset="0.42" stop-color="currentColor" stop-opacity="0" />
                  <stop offset="0.59" stop-color="currentColor" stop-opacity="0" />
                  <stop offset="0.81" stop-color="currentColor" />
                </linearGradient>
              </defs>
            </svg>
          </span>
          45
        </h3>
        <span>$369</span>
      </div>
    </div>
  </div>

  <div class="history">
    <TabContent>
      <TabPane tabId="history" tab="History" active>
        <table class="table table-borderless">
          <thead>
            <tr>
              <th>
                <span>Name</span>
              </th>
              <th>
                <span>Type</span>
              </th>
              <th>
                <span>Buyer</span>
              </th>
              <th>
                <span>Wen</span>
              </th>
              <th>
                <span>Sell price</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <span>0027JMXBTL23051645</span>
              </td>
              <td>
                <span>Item</span>
              </td>
              <td>
                <span>Near</span>
              </td>
              <td>
                <span>about 1 hour ago</span>
              </td>
              <td>
                <span>20</span>
              </td>
            </tr>
            <tr>
              <td>
                <span>0027JMXBTL23051645</span>
              </td>
              <td>
                <span>Item</span>
              </td>
              <td>
                <span>Near</span>
              </td>
              <td>
                <span>about 1 hour ago</span>
              </td>
              <td>
                <span>20</span>
              </td>
            </tr>
            <tr>
              <td>
                <span>0027JMXBTL23051645</span>
              </td>
              <td>
                <span>Item</span>
              </td>
              <td>
                <span>Near</span>
              </td>
              <td>
                <span>about 1 hour ago</span>
              </td>
              <td>
                <span>20</span>
              </td>
            </tr>
            <tr>
              <td>
                <span>0027JMXBTL23051645</span>
              </td>
              <td>
                <span>Item</span>
              </td>
              <td>
                <span>Near</span>
              </td>
              <td>
                <span>about 1 hour ago</span>
              </td>
              <td>
                <span>20</span>
              </td>
            </tr>
            <tr>
              <td>
                <span>0027JMXBTL23051645</span>
              </td>
              <td>
                <span>Item</span>
              </td>
              <td>
                <span>Near</span>
              </td>
              <td>
                <span>about 1 hour ago</span>
              </td>
              <td>
                <span>20</span>
              </td>
            </tr>
          </tbody>
        </table>
      </TabPane>
    </TabContent>
  </div>
</section>