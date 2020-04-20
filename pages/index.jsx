import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import Router, { withRouter } from 'next/router'

import Layout from '../components/Layout';
import ListItem from '../components/ListItem';
import Hero from '../components/Hero';

import '../styles/styles.scss';


const Index = (props) => {
  const [isLoading, setLoading] = useState(false);
  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);

  useEffect(() => {
    Router.events.on('routeChangeStart', startLoading);
    Router.events.on('routeChangeComplete', stopLoading);

    return () => {
      Router.events.off('routeChangeStart', startLoading);
      Router.events.off('routeChangeComplete', stopLoading);
    }
  }, [])

  const paginationHandler = (page) => {
    const currentPath = props.router.pathname;
    const currentQuery = { ...props.router.query };
    currentQuery.page = page.selected + 1;

    props.router.push({
      pathname: currentPath,
      query: currentQuery,
    });
  };

  const pageEnd = Number(props.currentPage) * Number(props.perPage);
  const pageStart = (pageEnd - Number(props.perPage)) + 1;

  return (
    <Layout>
      <React.Fragment>
        <Hero />
        <div className="container" style={{paddingTop: '3rem'}}>
          <h1 className="title is-1 has-text-warning">Video games!</h1>
          <h2 className="title is-4">Displaying {pageStart} to {pageEnd} of {props.totalCount} results</h2>
          <ReactPaginate
            previousLabel={'previous'}
            nextLabel={'next'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            activeClassName={'active'}
            containerClassName={'pagination'}
            subContainerClassName={'pages pagination'}

            initialPage={props.currentPage - 1}
            pageCount={props.pageCount} //page count
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={paginationHandler}
          />
          <div className="listItems">
            {props.games.map(game => (
              <ListItem
                key={game.id}
                name={game.name}
                image_url={game.image_url}
              />
            ))}
          </div>

          <ReactPaginate
            previousLabel={'previous'}
            nextLabel={'next'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            activeClassName={'active'}
            containerClassName={'pagination'}
            subContainerClassName={'pages pagination'}

            initialPage={props.currentPage - 1}
            pageCount={props.pageCount} //page count
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={paginationHandler}
          />
        </div>
      </React.Fragment>
    </Layout>
  );
};

Index.getInitialProps = async ({ query }) => {
    const page = query.page || 1;
    const repsponse = await axios.get(`http://localhost:4000/games?page=${page}`);
    return {
      totalCount: repsponse.data._meta.totalCount,
      pageCount: repsponse.data._meta.totalPages,
      currentPage: repsponse.data._meta.currentPage,
      perPage: repsponse.data._meta.pageSize,
      games: repsponse.data.games,
      isLoading: false,
    };
}


export default withRouter(Index);
