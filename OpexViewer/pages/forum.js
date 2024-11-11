/* eslint-disable @next/next/no-html-link-for-pages */
import { useRouter } from 'next/router';
import React,
{ useCallback, useEffect, useState, memo, useMemo, useRef } from 'react';

import { getAuthUserParams } from '../containers/withAuthUser/withAuthUser';


import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import ForumIndex from '../components/Forum/ForumIndex';
import ForumCategory from '../components/Forum/ForumCategory';
import ForumWritePost from '../components/Forum/ForumWritePost';
import ForumPosts from '../components/Forum/ForumPosts';

import styles from '../components/Forum/Forum.module.css';

const mongo = require('../../db/mongoClient');
const forumData = mongo.getForumTable();

const categoryList = [
    {
        category: 'opexbot',
        title: 'OpexBot',
        description: 'Обсуждаем возможности и использование торгового помощника OpexBot. Советы и опыт для более эффективной торговли.',
    },
    {
        category: 'robots',
        title: 'Роботы',
        description: 'Обсуждаем перспективных роботов: делимся новыми идеями и достижениями. Находим решения для улучшения работы.',
    },
    {
        category: 'help',
        title: 'Помощь',
        description: 'Вопросы и ответы: задаём вопросы по трейдингу и роботам, помогаем друг другу с решениями.',
    },
    {
        category: 'ideas',
        title: 'Идеи',
        description: 'Идеи и прототипы: обмениваемся новыми концепциями и создаём прототипы.',
    },
    {
        category: 'stocks',
        title: 'Акции',
        description: 'Акции и алгоритмы: обсуждаем стратегии для акций и алгоритмы для торговли.',
    },
    {
        category: 'flood',
        title: 'Флудилка',
        description: 'Флудилка: общение на любые темы, отдых от обсуждений и обмен впечатлениями.',
    },
];

export async function getServerSideProps(props) {
    const { req, res,
        locale,
        query,
    } = props;

    const {
        category,
        name,
    } = query || {};

    const user = await getAuthUserParams(props);

    const getCategory = categoryList.filter(c => c.category === category);
    const isPost = Boolean(getCategory?.length && name);
    let isCategory = Boolean(getCategory?.length && !name);
    let isIndex = !isCategory;

    let forumPosts;

    // console.log(isCategory, isPost, isIndex, getCategory, name,);

    if (isPost) {
        forumPosts = await forumData.getPosts({
            category,
            name,
        });
        isCategory = false;
        isIndex = false;
    } else if (isCategory) {
        forumPosts = await forumData.getCategoryPosts({
            category,
        });

        isIndex = false;
    } else if (isIndex) {
        forumPosts = await forumData.getIndexPosts({
            categories: categoryList.map(c => c.category),
        });
    }

    if (!forumPosts?.length && !Object.keys(forumPosts || {}).length) {
        return {
            props: {
                isEmpty: true,
            },
        };
    }

    return {
        props: {
            ...(await serverSideTranslations(locale || 'ru', ['common'])),
            user,
            forumPosts: forumPosts || null,
            category: category || null,
            curCategory: getCategory[0] || null,
            name: name || null,
            title: isCategory ?
                getCategory[0].title : isPost ? '' :
                    'Сообщество по созданию торговых роботов и автоматизации торговли',
            description: getCategory[0]?.description || 'Робот экономит ваше время на анализ рынка, подсвечивает драйверы роста, экономит время на покупке пакета акций, кэшбек 10% на комиссию в Тинькофф Инвестиции при торговле через OpexBot',
            keywords: 'Акции, котировки, цена в реальном времени, торговый помощник, opexbot.',
            isCategory,
            isPost,
            isIndex,

            // image: 'https://opexflow.com/images/opexbotcartlist.png',
        },
    };
}

export default memo(function Community(props) {
    const {
        user,
        appSocket,
        forumPosts,
        category: categoryName,
        curCategory,
        name,

        isCategory,
        isPost,
        isIndex,

        isEmpty,
    } = props;

    return <>
        <div

            // className={styles.HeadTitle}
            style={{
                position: 'relative',
                maxWidth: 1000,
                margin: '0 auto',
                paddingInline: '5px',

                // lineHeight: '180px',
            }}
        >
            {
                isEmpty ? <div
                    style={{
                        paddingTop: 50,
                        textAlign: 'center',

                    }}
                >
                    <h3>Сообщение не найдено.</h3>
                    <meta http-equiv="refresh" content="5; url=/forum/" />
                </div> :
                    <div
                        style={{
                            paddingTop: 50,
                            textAlign: 'left',

                        }}
                    >
                        {
                            Boolean(isIndex) && <ForumIndex
                                user={user}
                                categoryList={categoryList}
                                forumPosts={forumPosts}
                            />
                        }
                        {
                            Boolean(isCategory) && <ForumCategory
                                appSocket={appSocket}
                                user={user}
                                curCategory={curCategory}
                                forumPosts={forumPosts}
                            />
                        }
                        {
                            Boolean(isPost) && <ForumPosts
                                user={user}
                                forumPost={forumPosts?.[0]}
                            />
                        }

                    </div>
            }
        </div>
    </>;
});
