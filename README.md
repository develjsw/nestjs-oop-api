### OOP 패러다임 적용 프로젝트

- 구조 및 패턴
  - Layered Architecture
  - CQRS Pattern
  - Prisma ORM
    - Master DB / Slave DB 분리 구조
  

- Prisma 설정 및 사용 방법
  - Prisma 설치
    ~~~
    # 개발용 Prisma CLI 설치
    $ npm install prisma --save-dev

    # 런타임용 Prisma Client 설치
    $ npm install @prisma/client
    ~~~
  - 폴더 생성 및 스키마 설정
    - 📁 path : nestjs-oop-api/prisma/master/schema.prisma
      ~~~
      generator client {
        provider = "prisma-client-js"
        output   = "../../src/prisma/generated/master"
      }

      datasource db {
        provider = "mysql"
        url      = env("MASTER_DATABASE_URL")
      }
      ~~~
    - 📁 path : nestjs-oop-api/prisma/slave/schema.prisma
      ~~~
      generator client {
        provider = "prisma-client-js"
        output   = "../../src/prisma/generated/slave"
      }

      datasource db {
        provider = "mysql"
        url      = env("SLAVE_DATABASE_URL")
      }
      ~~~
  - .env 파일 생성
    - 파일명은 .env 이어야 Prisma 6.x에서 prisma db pull, prisma generate 명령어 실행 시 자동으로 인식
    - 위 명령어들은 .env 파일의 환경 변수만을 참조하므로, CLI 실행 시에는 반드시 해당 파일이 존재해야 함
    - 📁 path : nestjs-oop-api/.env
      ~~~
      # .env 파일 설정 값
      MASTER_DATABASE_URL="mysql://user:password@host:3306/master_db"
      SLAVE_DATABASE_URL="mysql://user:password@host:3306/slave_db"
      ~~~
    -
    | 용도 | 파일명 | 설명 |
    |---|---|---|
    | Prisma CLI (`db pull`, `generate`) | `.env` | Prisma 명령어 실행 시 반드시 사용됨. 이 외 파일은 인식 안 됨 |
    | NestJS 앱 실행 (로컬, 개발, 운영 등) | `.env.local`, `.env.development`, `.env.production` | 실행 환경 구분을 위해 사용. NestJS에서만 적용됨 |

  - DB 테이블 기반 모델 생성
    ~~~
    # master
    $ npx prisma db pull --schema=prisma/master/schema.prisma
    
    # slave
    $ npx prisma db pull --schema=prisma/slave/schema.prisma
    ~~~
  - Prisma Client 생성
    ~~~
    # master
    $ npx prisma generate --schema=prisma/master/schema.prisma

    # slave
    $ npx prisma generate --schema=prisma/slave/schema.prisma
    ~~~