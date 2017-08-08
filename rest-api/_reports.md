# Reports

This method allows you to **access** and **extract** all the [Reports](https://www.livechatinc.com/kb/reporting-options-available-in-livechat/) data available in LiveChat.

## Available paths

| Methods      | Path      |
|--------------|-----------|
| `GET` | `/reports/chats/total_chats` |
| `GET` | `/reports/chats/engagement` |
| `GET` | `/reports/chats/ratings` |
| `GET` | `/reports/chats/ratings/ranking` |
| `GET` | `/reports/chats/queued_visitors` |
| `GET` | `/reports/chats/queued_visitors/waiting_times` |
| `GET` | `/reports/availability` |
| `GET` | `/reports/chats/chatting_time` |
| `GET` | `/reports/chats/first_response_time` |
| `GET` | `/reports/chats/response_time` |
| `GET` | `/reports/chats/goals` |
| `GET` | `/reports/chats/greetings` |
| `GET` | `/reports/tickets/new_tickets` |
| `GET` | `/reports/tickets/first_response_time` |
| `GET` | `/reports/tickets/solved_tickets` |
| `GET` | `/reports/tickets/resolution_time` |
| `GET` | `/reports/tickets/ticket_sources` |
| `GET` | `/reports/tickets/ratings` |
| `GET` | `/reports/tickets/ratings/ranking` |


## Total chats

> Path

```
GET https://api.livechatinc.com/reports/chats/total_chats
```

> Example request

```shell
curl "https://api.livechatinc.com/reports/chats/total_chats?\
date_from=2013-01-29&\
date_to=2013-01-29&\
agent=john.doe@mycompany.com&\
group_by=hour" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2
```

> Example response

```json-doc
{
  "00:00": {
    "chats": 18
  },
  "01:00": {
    "chats": 19
  },
    "02:00": {
    "chats": 6
  },
    "03:00": {
      "chats": 15
  },
  "04:00": {
    "chats": 10
  },
  "05:00": {
    "chats": 14
  },
  "06:00": {
    "chats": 11
  },
  //(...)
  "21:00": {
    "chats": 0
  },
  "22:00": {
    "chats": 0
  },
  "23:00": {
    "chats": 2
  }
}
```

Shows how many chats occurred during the specified period.

#### Optional arguments

| Argument | Description |
|---------|--------------------|
| `date_from` | `YYYY-MM-DD`, defaults to `the beginning of time` |
| `date_to` | `YYYY-MM-DD`, defaults to `today` |
| `timezone` | timezone in the [TZ format](http://en.wikipedia.org/wiki/List_of_tz_database_time_zones) (e.g. America/Phoenix) |
| `group` | id of the group, not set by default, returns statistics for the specified group |
| `agent` | agent's login, not set by default, return statistics for the specified agent |
| `group_by` | defaults to `day` (or `hour` when date_from equals date_to), can be set to `month`, `hour` or `day` |
| `tag[]` | return statistics for the specified tag |

## Chat engagement

> Path

```
GET https://api.livechatinc.com/reports/chats/engagement
```

> Example request

```shell
curl "https://api.livechatinc.com/reports/chats/engagement?\
date_from=2013-01-28&\
date_to=2013-01-29&\
agent=john.doe@mycompany.com&\
tag[]=sales&\
group_by=hour" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2
```

> Example response

```json-doc
{
  "2013-01-28":{
    "chats_from_auto_invite":1,
    "chats_from_immediate_start":0,
    "chats_from_manual_invite":3
  },
  "2013-01-29":{
    "chats_from_auto_invite":0,
    "chats_from_immediate_start":2,
    "chats_from_manual_invite":0
  }
}
```

This report shows you where do you get your chats, i.e. from automatic invitations, manual invitations or visitors starting chats themselves.

#### Optional arguments

| Argument | Description |
|---------|--------------------|
| `date_from` | `YYYY-MM-DD`, defaults to `the beginning of time` |
| `date_to` | `YYYY-MM-DD`, defaults to `today` |
| `timezone` | timezone in the [TZ format](http://en.wikipedia.org/wiki/List_of_tz_database_time_zones) (e.g. America/Phoenix) |
| `group` | id of the group, not set by default, returns statistics for the specified group |
| `agent` | agent's login, not set by default, return statistics for the specified agent |
| `group_by` | defaults to `day` (or `hour` when date_from equals date_to), can be set to `month`, `hour` or `day` |
| `tag[]` | return statistics for the specified tag |

## Chat ratings report

> Path

```
GET https://api.livechatinc.com/reports/chats/ratings
```

> Example request

```shell
curl "https://api.livechatinc.com/reports/chats/ratings?\
group=2&\
date_from=2012-01-29&\
date_to=2013-01-29&\
group_by=month" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2
```

> Example response

```json-doc
{
  "2012-01": {
    "begin": "2012-01-29",
    "end": "2012-01-31",
    "bad": 0,
    "good": 6,
    "chats": 37
  },
  "2012-02": {
    "begin": "2012-02-01",
    "end": "2012-02-29",
    "bad": 4,
    "good": 38,
    "chats": 320
  },
  "2012-03": {
    "begin": "2012-03-01",
    "end": "2012-03-31",
    "bad": 0,
    "good": 16,
    "chats": 186
  },
  //(...) 
  "2012-11": {
    "begin": "2012-11-01",
    "end": "2012-11-30",
    "bad": 20,
    "good": 49,
    "chats": 389
  }
}
```

Shows how many chats were rated and how they have been rated during specified period.

#### Optional arguments

| Argument | Description |
|---------|--------------------|
| `date_from` | `YYYY-MM-DD`, defaults to `the beginning of time` |
| `date_to` | `YYYY-MM-DD`, defaults to `today` |
| `timezone` | timezone in the [TZ format](http://en.wikipedia.org/wiki/List_of_tz_database_time_zones) (e.g. America/Phoenix) |
| `group` | id of the group, not set by default, returns statistics for the specified group |
| `agent` | agent's login, not set by default, return statistics for the specified agent |
| `group_by` | defaults to `day` (or `hour` when date_from equals date_to), can be set to `month`, `hour` or `day` |
| `tag[]` | return statistics for the specified tag |


## Chat Ranking

> Path

```
GET https://api.livechatinc.com/reports/chats/ratings/ranking
```

> Example request

```shell
curl "https://api.livechatinc.com/reports/chats/ratings/ranking" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2
```

> Example response

```json-doc
{
  "ranking": [
    {
      "good": 2502,
      "bad": 426,
      "total": 2928,
      "score": 0.8361489669658251,
      "name": "john.doe@mycompany.com"
    },
    {
      "good": 2164,
      "bad": 443,
      "total": 2607,
      "score": 0.8094273999034496,
      "name": "jane.doe@mycompany.com"
    },
    {
      "good": 1070,
      "bad": 215,
      "total": 1285,
      "score": 0.8029689181922964,
      "name": "jenny.doe@mycompany.com"
    }
}
```

Shows the ratio of good to bad ratings for each operator.

#### Optional arguments

| Argument | Description |
|---------|--------------------|
| `date_from` | `YYYY-MM-DD`, defaults to `the beginning of time` |
| `date_to` | `YYYY-MM-DD`, defaults to `today` |
| `group` | id of the group, not set by default, returns statistics for the specified group |
| `tag[]` | return statistics for the specified tag |

## Queued visitors

> Path

```
GET https://api.livechatinc.com/reports/chats/queued_visitors
```

> Example request

```shell
curl "https://api.livechatinc.com/reports/chats/queued_visitors?\
date_from=2013-01-29&\
group=2" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2
```

> Example response

```json-doc
{
  "2013-01-29": {
    "queued": {
      "count": 6,
    },
    "left_queue": {
      "count": 3,
    },
    "entered_chat": {
      "count": 3,
    }
  },
  "2013-01-30": {
    "queued": {
      "count": 2,
    },
    "left_queue": {
      "count": 0
    },
    "entered_chat": {
      "count": 2,
    }
  }
}
```

Shows how many visitors were waiting in the queue, how many abandoned the queue or proceeded to chats.

#### Optional arguments

| Argument | Description |
|---------|--------------------|
| `date_from` | `YYYY-MM-DD`, defaults to `the beginning of time` |
| `date_to` | `YYYY-MM-DD`, defaults to `today` |
| `timezone` | timezone in the [TZ format](http://en.wikipedia.org/wiki/List_of_tz_database_time_zones) (e.g. America/Phoenix) |
| `group` | id of the group, not set by default, returns statistics for the specified group |
| `group_by` | defaults to `day` (or `hour` when date_from equals date_to), can be set to `month`, `hour` or `day` |


## Queue waiting times

> Path

```
GET https://api.livechatinc.com/reports/chats/queued_visitors/waiting_times
```

> Example request

```shell
curl "https://api.livechatinc.com/reports/chats/queued_visitors/waiting_times?\
date_from=2013-01-29&\
group=2" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2
```

> Example response

```json-doc
{
  "2013-01-29":{
    "queued":{
      "count": 1,
      "min":{
        "seconds":0
      },
      "max":{
        "seconds":112
      },
      "average":{
        "seconds":24
      }
    },
    "left_queue":{
      "count": 3,
      "min":{
        "seconds":33
      },
      "max":{
        "seconds":56
      },
      "average":{
        "seconds":44
      }
    },
    "entered_chat":{
      "count": 2,
      "min":{
        "seconds":10
      },
      "max":{
        "seconds":112
      },
      "average":{
        "seconds":23
      }
    }
  }
}
```

Shows Minimum, Average and Maximum waiting time.

#### Optional arguments

| Argument | Description |
|---------|--------------------|
| `date_from` | `YYYY-MM-DD`, defaults to `the beginning of time` |
| `date_to` | `YYYY-MM-DD`, defaults to `today` |
| `timezone` | timezone in the [TZ format](http://en.wikipedia.org/wiki/List_of_tz_database_time_zones) (e.g. America/Phoenix) |
| `group` | id of the group, not set by default, returns statistics for the specified group |
| `group_by` | defaults to `day` (or `hour` when date_from equals date_to), can be set to `month`, `hour` or `day` |

## Availability

> Path

```
GET https://api.livechatinc.com/reports/availability
```

> Example request

```shell
curl "https://api.livechatinc.com/reports/availability?\
date_from=2013-01-25&\
date_to=2013-01-30&\
agent=john.doe@mycompany.com&\
group_by=day"\
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2
```

> Example response

```json-doc
{
  "2013-01-25": {
    "hours": 0
  },
  "2013-01-26": {
    "hours": 0
  },
  "2013-01-27": {
    "hours": 0.01
  },
  "2013-01-28": {
    "hours": 7.85
  },
  "2013-01-29": {
    "hours": 7.99
  },
  "2013-01-30": {
    "hours": 2.28
  }
}
```

Shows how much the agent (or group or whole account) was available for chatting during specified period. When querying for one day results are shown in minutes per every hour, otherwise in hours for each day.

#### Optional arguments

| Argument | Description |
|---------|--------------------|
| `date_from` | `YYYY-MM-DD`, defaults to `the beginning of time` |
| `date_to` | `YYYY-MM-DD`, defaults to `today` |
| `timezone` | timezone in the [TZ format](http://en.wikipedia.org/wiki/List_of_tz_database_time_zones) (e.g. America/Phoenix) |
| `group` | id of the group, not set by default, returns statistics for the specified group |
| `agent` | agent's login, not set by default, return statistics for the specified agent |


## Chatting time

> Path

```
GET https://api.livechatinc.com/reports/chats/chatting_time
```

> Example request

```shell
curl "https://api.livechatinc.com/reports/chats/chatting_time?\
date_from=2013-01-25&\
date_to=2013-01-30&\
group=1" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2
```

> Example response

```json-doc
{
  "2013-01-25": {
    "hours": 8.17
  },
  "2013-01-26": {
    "hours": 9.2
  },
  "2013-01-27": {
    "hours": 5.3
  },
  "2013-01-28": {
    "hours": 7.16
  },
  "2013-01-29": {
    "hours": 10.71
  },
  "2013-01-30": {
    "hours": 6.51
  }
}
```

Shows how much time the agent (or group) spent on chatting during specified period. When querying for one day results are shown in minutes per every hour, otherwise in hours for each day.

#### Optional arguments

| Argument | Description |
|---------|--------------------|
| `date_from` | `YYYY-MM-DD`, defaults to `the beginning of time` |
| `date_to` | `YYYY-MM-DD`, defaults to `today` |
| `group` | id of the group, not set by default, returns statistics for the specified group |
| `agent` | agent's login, not set by default, returns statistics for the specified agent |
| `tag[]` | return statistics for the specified tag |


## Chats first response time

> Path

```
GET https://api.livechatinc.com/reports/chats/first_response_time
```

> Example request

```shell
curl "https://api.livechatinc.com/reports/chats/first_response_time?\
date_from=2014-01-10&\
date_to=2014-01-20&\
agent=john.doe@mycompany.com" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2
```

> Example response

```json-doc
{
  "2014-01-10": {
    "first_response_time": {
      "count": 5,
      "seconds": 0.83
    }
  },
  "2014-01-11": {
    "first_response_time": {
      "count": 1,
      "seconds": 1.3
    }
  },
  //(...)
  "2014-01-20": {
    "first_response_time":{
      "count": 0,
      "seconds": null
    }
  }
}
```

The average amount of time it takes for agents to respond to a new chat over a specified period of time.

#### Optional arguments

| Argument | Description |
|---------|--------------------|
| `date_from` | `YYYY-MM-DD`, defaults to `the beginning of time` |
| `date_to` | `YYYY-MM-DD`, defaults to `today` |
| `group` | id of the group, not set by default, returns statistics for the specified group |
| `agent` | agent's login, not set by default, return statistics for the specified agent |
| `group_by` | defaults to `day` (or `hour` when date_from equals date_to), can be set to `month`, `hour` or `day` |
| `tag[]` | return statistics for the specified tag |

The following parameters are returned for each date:

*   `count` – the number of chat first responses during the specified period.
*   `seconds` – average first response time.

## Chats response time

> Path

```
GET https://api.livechatinc.com/reports/chats/response_time
```

> Example request

```shell
curl "https://api.livechatinc.com/reports/chats/response_time?\
date_from=2014-01-10&\
date_to=2014-01-20&\
agent=john.doe@mycompany.com" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2
```

> Example response

```json-doc
{
  "2014-01-10": {
    "avg_response_time": {
      "count": 5,
      "seconds": 0.83
    }
  },
  "2014-01-11": {
    "avg_response_time": {
      "count": 1,
      "seconds": 1.3
    }
  },
  //(...)
  "2014-01-20": {
    "avg_response_time":{
      "count": 0,
      "seconds": null
    }
  }
}
```

The average amount of time it takes for agents to respond to a new message in a chat during a specified period.

#### Optional arguments

| Argument | Description |
|---------|--------------------|
| `date_from` | `YYYY-MM-DD`, defaults to `the beginning of time` |
| `date_to` | `YYYY-MM-DD`, defaults to `today` |
| `group` | id of the group, not set by default, returns statistics for the specified group |
| `agent` | agent's login, not set by default, return statistics for the specified agent |
| `group_by` | defaults to `day` (or `hour` when date_from equals date_to), can be set to `month`, `hour` or `day` |
| `tag[]` | return statistics for the specified tag |

The following parameters are returned for each date:

*   `count` – the number of chat responses during the specified period.
*   `seconds` – average response time.

## Number of simultaneous chats

> Path

```
GET https://api.livechatinc.com/reports/chats/agents_occupancy
```

> Example request

```shell
curl "https://api.livechatinc.com/reports/chats/agents_occupancy?\
weekday=mon" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2
```

> Example response

```json-doc
{
    "2015-03-16 00:00": 0,
    "2015-03-16 01:00": 0,
    "2015-03-16 02:00": 0,
    "2015-03-16 03:00": 0,
    "2015-03-16 04:00": 0,
    "2015-03-16 05:00": 0,
    "2015-03-16 06:00": 0,
    "2015-03-16 07:00": 0,
    "2015-03-16 08:00": 0,
    "2015-03-16 09:00": 13,
    "2015-03-16 10:00": 17,
    "2015-03-16 11:00": 20,
    "2015-03-16 12:00": 20,
    "2015-03-16 13:00": 16,
    "2015-03-16 14:00": 16,
    "...": "...",
    "2015-03-23 00:00": 0,
    "2015-03-23 01:00": 0,
    "2015-03-23 02:00": 0,
    "2015-03-23 03:00": 0,
    "2015-03-23 04:00": 0,
    ...
    "2015-04-06 23:00": 0
}
```

This request shows the maximum number of concurrent chats that have happened at the same hour on a particular day.

#### Required arguments

| Argument | Description |
|---------|--------------------
| `weekday` | you can select the day by changing the weekday parameter to one of the following values: `mon` for Monday, `tue` for Tuesday, `wed` for Wednesday, `thu` for Thursday, `fri` for Friday, `sat` for saturday and `sun` for Sunday |


## Goals

> Path

```
GET https://api.livechatinc.com/reports/chats/goals
```

> Example request

```shell
curl "https://api.livechatinc.com/reports/chats/goals?\
date_from=2013-01-01&\
goal=71&group_by=month" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2
```

> Example response

```json-doc
{
  "2013-01": {
    "begin": "2013-01-01",
    "end": "2013-01-30",
    "goals": 4
  }
}
```

Shows the number of reached goals.

#### Optional arguments

| Argument | Description |
|---------|--------------------|
| `date_from` | `YYYY-MM-DD`, defaults to `the beginning of time` |
| `date_to` | `YYYY-MM-DD`, defaults to `today` |
| `timezone` | timezone in the [TZ format](http://en.wikipedia.org/wiki/List_of_tz_database_time_zones) (e.g. America/Phoenix) |
| `group` | id of the group, not set by default, returns statistics for the specified group |
| `goal` | id of the goal, not set by default |
| `agent` | agent's login, not set by default, return statistics for the specified agent |
| `group_by` | defaults to `day` (or `hour` when date_from equals date_to), can be set to `month`, `hour` or `day` |
| `tag[]` | return statistics for the specified tag |

## Greetings

> Path

```
GET https://api.livechatinc.com/reports/chats/greetings
```

> Example request

```shell
curl "https://api.livechatinc.com/reports/chats/greetings?\
date_from=2014-01-13&\
date_to=2014-02-14&\
group_by=month" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2
```

> Example response

```json-doc
{
  "2014-01": {
    "begin": "2014-01-13",
    "end": "2014-01-31",
    "displayed": 274,
    "accepted": 190,
    "goals": 40
  },
  "2014-02": {
  "begin": "2014-02-01",
    "end": "2014-02-14",
    "displayed": 146,
    "accepted": 88,
    "goals": 22
  }
}
```

Returns the “greetings to chats to goals” conversion rates report.

`displayed` is the number of displayed greetings. `accepted` tells you how many chats resulted from these greetings. `goals` tells you how many goals resulted from these greetings.

#### Optional arguments

| Argument | Description |
|---------|--------------------|
| `date_from` | `YYYY-MM-DD`, defaults to `the beginning of time` |
| `date_to` | `YYYY-MM-DD`, defaults to `today` |
| `timezone` | timezone in the [TZ format](http://en.wikipedia.org/wiki/List_of_tz_database_time_zones) (e.g. America/Phoenix) |
| `group` | id of the group, not set by default, returns statistics for the specified group |
| `goal` | id of the goal, not set by default |
| `greeting` | `id` of the greeting, not set by default, returns statistics for the specified greeting |
| `group_by` | defaults to `day` (or `hour` when date_from equals date_to), can be set to `month`, `hour` or `day` |
| `tag[]` | return statistics for the specified tag |

## New tickets

> Path

```
GET https://api.livechatinc.com/reports/tickets/new_tickets
```

> Example request

```shell
curl "https://api.livechatinc.com/reports/tickets/new_tickets?\
date_from=2013-01-29&\
date_to=2013-01-29&\
group_by=hour" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2
```

> Example response

```json-doc
{
  "00:00": {
    "new_tickets": 5
  },
  "01:00": {
    "new_tickets": 1
  },
  //(...)
  "23:00": {
    "new_tickets": 21
  }
}
```

Shows the number of the tickets created during the specified period.

#### Optional arguments

| Argument | Description |
|---------|--------------------|
| `date_from` | `YYYY-MM-DD`, defaults to `the beginning of time` |
| `date_to` | `YYYY-MM-DD`, defaults to `today` |
| `timezone` | timezone in the [TZ format](http://en.wikipedia.org/wiki/List_of_tz_database_time_zones) (e.g. America/Phoenix) |
| `group` | id of the group, not set by default, returns statistics for the specified group |
| `group_by` | defaults to `day` (or `hour` when date_from equals date_to), can be set to `month`, `hour` or `day` |
| `tag[]` | return statistics for the specified tag |

## Tickets first response time

> Path

```
GET https://api.livechatinc.com/reports/tickets/first_response_time
```

> Example request

```shell
curl "https://api.livechatinc.com/reports/tickets/first_response_time?\
date_from=2014-01-10&\
date_to=2014-01-20&\
agent=john.doe@mycompany.com" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2
```

> Example response

```json-doc
{
  "2014-01-10": {
    "count": 5,
    "hours": 0.83
  },
  "2014-01-11": {
    "count": 1,
    "hours": 1.3
  },
  //(...)
  "2014-01-20": {
    "count": 0,
    "hours": null
  }
}
```

Shows the time of the first response to tickets that were responded to for the first time during the specified period.

#### Optional arguments

| Argument | Description |
|---------|--------------------|
| `date_from` | `YYYY-MM-DD`, defaults to `the beginning of time` |
| `date_to` | `YYYY-MM-DD`, defaults to `today` |
| `timezone` | timezone in the [TZ format](http://en.wikipedia.org/wiki/List_of_tz_database_time_zones) (e.g. America/Phoenix) |
| `agent` | agent's login, not set by default, return statistics for the specified agent |
| `group` | id of the group, not set by default, returns statistics for the specified group |
| `group_by` | defaults to `day` (or `hour` when date_from equals date_to), can be set to `month`, `hour` or `day` |
| `tag[]` | return statistics for the specified tag |

The following parameters are returned for each date:

*   `count` – the number of tickets that were responded to for the first time that day.
*   `hours` – average first response time of the tickets. For example, `"hours": 0.83` means an average first response time of 49mins 48sec.

## Solved tickets

> Path

```
GET https://api.livechatinc.com/reports/tickets/solved_tickets
```

> Example request

```shell
curl "https://api.livechatinc.com/reports/tickets/solved_tickets?\
date_from=2014-01-10&\
date_to=2014-01-20" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2
```

> Example response

```json-doc
{
  "2014-01-10": {
    "solved_tickets": 4
  },
  "2014-01-11": {
    "solved_tickets": 12
  },
  //(...)
  "2014-01-20": {
    "solved_tickets": 4
  }
}
```

Shows the number of the tickets solved during the specified period.

#### Optional arguments

| Argument | Description |
|---------|--------------------|
| `date_from` | `YYYY-MM-DD`, defaults to `the beginning of time` |
| `date_to` | `YYYY-MM-DD`, defaults to `today` |
| `timezone` | timezone in the [TZ format](http://en.wikipedia.org/wiki/List_of_tz_database_time_zones) (e.g. America/Phoenix) |
| `agent` | agent's login, not set by default, return statistics for the specified agent |
| `group` | id of the group, not set by default, returns statistics for the specified group |
| `group_by` | defaults to `day` (or `hour` when date_from equals date_to), can be set to `month`, `hour` or `day` |
| `tag[]` | return statistics for the specified tag |


## Tickets resolution time

> Path

```
GET https://api.livechatinc.com/reports/tickets/resolution_time
```

> Example request

```shell
curl "https://api.livechatinc.com/reports/tickets/resolution_time?\
date_from=2014-01-10&\
date_to=2014-01-20" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2
```

> Example response

```json-doc
{
  "2014-01-10": {
    "count": 3,
    "hours": 16.27
  },
  "2014-01-11": {
    "count": 0,
    "hours": null
  },
  //(...)
  "2014-01-20": {
    "count": 2,
    "hours": 1.8
  }
}
```

Shows the resolution time of the tickets that were solved during the specified period.


#### Optional arguments

| Argument | Description |
|---------|--------------------|
| `date_from` | `YYYY-MM-DD`, defaults to `the beginning of time` |
| `date_to` | `YYYY-MM-DD`, defaults to `today` |
| `timezone` | timezone in the [TZ format](http://en.wikipedia.org/wiki/List_of_tz_database_time_zones) (e.g. America/Phoenix) |
| `agent` | agent's login, not set by default, return statistics for the specified agent |
| `group` | id of the group, not set by default, returns statistics for the specified group |
| `group_by` | defaults to `day` (or `hour` when date_from equals date_to), can be set to `month`, `hour` or `day` |
| `tag[]` | return statistics for the specified tag |

Two parameters are returned:

*   `count` – the number of tickets that were responded to for the first time that day.
*   `hours` – average first response time of the tickets. For example, `"hours": 0.83` means an average first response time of 49mins 48sec.

## Ticket sources

> Path

```
GET https://api.livechatinc.com/reports/tickets/ticket_sources
```

> Example request

```shell
curl "https://api.livechatinc.com/reports/tickets/ticket_sources?\
date_from=2014-01-10&\
date_to=2014-01-20" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2
```

> Example response

```json-doc
{
  "2014-01-10": {
    "tickets_from_chat_window": 4,
    "tickets_from_mail": 12,
    "tickets_from_chat": 2
  },
  "2014-01-11": {
    "tickets_from_chat_window": 7,
    "tickets_from_mail": 8,
    "tickets_from_chat": 6
  },
  //(...)
  "2014-01-20": {
    "tickets_from_chat_window": 0,
    "tickets_from_mail": 16,
    "tickets_from_chat": 1
  }
}
```

Shows the distribution of tickets between various channels.

#### Optional arguments

| Argument | Description |
|---------|--------------------|
| `date_from` | `YYYY-MM-DD`, defaults to `the beginning of time` |
| `date_to` | `YYYY-MM-DD`, defaults to `today` |
| `timezone` | timezone in the [TZ format](http://en.wikipedia.org/wiki/List_of_tz_database_time_zones) (e.g. America/Phoenix) |
| `group` | id of the group, not set by default, returns statistics for the specified group |
| `group_by` | defaults to `day` (or `hour` when date_from equals date_to), can be set to `month`, `hour` or `day` |
| `tag[]` | return statistics for the specified tag |

The following parameters are returned for each date:

*   `tickets_from_chat_window` – the number of tickets created by the visitor via the ticket form,
*   `tickets_from_mail` – the number of tickets created by sending an email to your support email tied to LiveChat,
*   `tickets_from_chat` – the number of tickets created by the agents during a chat.

## Ticket ratings report

> Path

```
GET https://api.livechatinc.com/reports/tickets/ratings
```

> Example request

```shell
curl "https://api.livechatinc.com/reports/tickets/ratings?\
group=2&\
date_from=2012-01-29&\
date_to=2013-01-29&\
group_by=month" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2
```

> Example response

```json-doc
{
  "2012-01": {
    "begin": "2012-01-29",
    "end": "2012-01-31",
    "bad": 0,
    "good": 6
  },
  "2012-02": {
    "begin": "2012-02-01",
    "end": "2012-02-29",
    "bad": 4,
    "good": 38
  },
  "2012-03": {
    "begin": "2012-03-01",
    "end": "2012-03-31",
    "bad": 0,
    "good": 16
  },
  //(...) 
  "2012-11": {
    "begin": "2012-11-01",
    "end": "2012-11-30",
    "bad": 20,
    "good": 49
  },
  "2012-12": {
    "begin": "2012-12-01",
    "end": "2012-12-31",
    "bad": 22,
    "good": 35
  },
  "2013-01": {
    "begin": "2013-01-01",
    "end": "2013-01-29",
    "bad": 18,
    "good": 51
  }
}
```

Shows tickets have been rated during specified period.

#### Optional arguments

| Argument | Description |
|---------|--------------------|
| `date_from` | `YYYY-MM-DD`, defaults to `the beginning of time` |
| `date_to` | `YYYY-MM-DD`, defaults to `today` |
| `timezone` | timezone in the [TZ format](http://en.wikipedia.org/wiki/List_of_tz_database_time_zones) (e.g. America/Phoenix) |
| `agent` | agent's login, not set by default, return statistics for the specified agent |
| `group` | id of the group, not set by default, returns statistics for the specified group |
| `group_by` | defaults to `day` (or `hour` when date_from equals date_to), can be set to `month`, `hour` or `day` |
| `tag[]` | return statistics for the specified tag |

## Ticket Ranking

> Path

```
GET https://api.livechatinc.com/reports/tickets/ratings/ranking
```

> Example request

```shell
curl "https://api.livechatinc.com/reports/tickets/ratings/ranking" \
  -u john.doe@mycompany.com:c14b85863755158d7aa5cc4ba17f61cb \
  -H X-API-Version:2
```

> Example response

```json-doc
{
  "ranking": [
    {
      "good": 2502,
      "bad": 426,
      "total": 2928,
      "score": 0.8361489669658251,
      "name": "john.doe@mycompany.com"
    },
    {
      "good": 2164,
      "bad": 443,
      "total": 2607,
      "score": 0.8094273999034496,
      "name": "jane.doe@mycompany.com"
    },
    {
      "good": 1070,
      "bad": 215,
      "total": 1285,
      "score": 0.8029689181922964,
      "name": "jenny.doe@mycompany.com"
    }
}
```

Shows the ratio of good to bad ratings for each operator.

#### Optional arguments

| Argument | Description |
|---------|--------------------|
| `date_from` | `YYYY-MM-DD`, defaults to `the beginning of time` |
| `date_to` | `YYYY-MM-DD`, defaults to `today` |
| `group` | id of the group, not set by default, returns statistics for the specified group |
| `tag[]` | return statistics for the specified tag |
