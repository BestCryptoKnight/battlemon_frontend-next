import Layout from '../components/layout';
import Image from 'next/image'

const kitchen = () => {
  return (
    <Layout>
      <>
      <h1>You kitchen</h1>
			
			<section className="catalog kitchen">			
				<div className="catalog-inner">
					<form className="catalog-sorting" action="">
						<ul className="sorting">
							<li className="active">Fighters</li>
							<li>Weapons</li>
							<li>Items</li>
							<li>Boosters</li>
							<li>Land</li>
							<li>Merchandise</li>
						</ul>
					</form>

					<div className="cards-wrap">
						<div className="card-preview">
							<div className="img-box">
								<picture>
                  <Image src="/img/fighters-23.png" width="269" height="357" alt="Fighter Lemon" />
								</picture>
							</div>
							<a href="#"></a>
						</div>
						<div className="card-preview">
							<div className="img-box">
								<picture>
                  <Image src="/img/fighters-23.png" width="269" height="357" alt="Fighter Lemon" />
								</picture>
							</div>
							<a href="#"></a>
						</div>
						<div className="card-preview">
              <div className="img-box">
                <picture>
                  <Image src="/img/fighters-23.png" width="269" height="357" alt="Fighter Lemon" />
                </picture>
							</div>
							<a href="#"></a>
						</div>
						<div className="card-preview">
							<div className="img-box">
                <picture>
                  <Image src="/img/fighters-23.png" width="269" height="357" alt="Fighter Lemon" />
                </picture>
							</div>
							<a href="#"></a>
						</div>
						<div className="card-preview">
              <div className="img-box">
                <picture>
                  <Image src="/img/fighters-23.png" width="269" height="357" alt="Fighter Lemon" />
                </picture>
							</div>
							<a href="#"></a>
						</div>
						<div className="buy-more">
							<span className="btn">buy more</span>
							<a href="#"></a>
						</div>
					</div>
				</div>
			</section>
      </>
    </Layout>
  );
};

export default kitchen;