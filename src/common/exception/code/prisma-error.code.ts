export const PrismaErrorCodeMap = {
    P2000: { status: 400, message: '입력 값이 너무 깁니다.' },
    P2001: { status: 404, message: '조건에 맞는 레코드를 찾을 수 없습니다.' },
    P2002: { status: 409, message: '고유 제약 조건이 위반되었습니다. 필드: {target}' },
    P2003: { status: 400, message: '외래 키 제약 조건에 위배됩니다. 필드: {field_name}' },
    P2004: { status: 400, message: '데이터베이스 제약 조건이 실패했습니다. {database_error}' },
    P2005: { status: 400, message: '저장된 값이 필드 타입에 맞지 않습니다. 필드: {field_name}' },
    P2006: { status: 400, message: '제공된 값이 필드에 유효하지 않습니다.' },
    P2007: { status: 400, message: '데이터 검증 오류가 발생했습니다. {database_error}' },
    P2008: { status: 400, message: '쿼리 구문 분석을 실패하였습니다. {query_parsing_error}' },
    P2009: { status: 400, message: '쿼리 검증을 실패하였습니다. {query_validation_error}' },
    P2010: { status: 400, message: '원시 쿼리가 실패했습니다. {message}' },
    P2011: { status: 400, message: 'NULL 제약 조건을 위반했습니다.' },
    P2012: { status: 400, message: '필수 값이 누락되었습니다. {path}' },
    P2013: { status: 400, message: '필수 인수가 누락되었습니다. {argument_name}' },
    P2014: { status: 400, message: '관계 무결성이 깨졌습니다. {relation_name}' },
    P2015: { status: 404, message: '관련 레코드를 찾을 수 없습니다. {details}' },
    P2016: { status: 400, message: '쿼리 해석 오류입니다. {details}' },
    P2017: { status: 400, message: '연결되지 않은 관계입니다.' },
    P2018: { status: 404, message: '연결 대상 레코드를 찾을 수 없습니다. {details}' },
    P2019: { status: 400, message: '입력 오류입니다. {details}' },
    P2020: { status: 400, message: '값이 허용된 범위를 벗어났습니다. {details}' },
    P2021: { status: 404, message: '테이블이 존재하지 않습니다. {table}' },
    P2022: { status: 404, message: '열이 존재하지 않습니다. {column}' },
    P2023: { status: 400, message: '일관되지 않은 열 데이터입니다.: {message}' },
    P2024: { status: 503, message: '연결 풀에서 커넥션을 가져오는 데 실패했습니다.' },
    P2025: { status: 404, message: '작업에 필요한 레코드를 찾을 수 없습니다.' },
    P2026: { status: 400, message: '지원되지 않는 기능입니다. {feature}' },
    P2027: { status: 500, message: '데이터베이스 오류가 여러 개 발생했습니다. {errors}' },
    P2028: { status: 500, message: '트랜잭션 API 오류입니다. {error}' },
    P2029: { status: 400, message: '쿼리 매개변수 제한을 초과했습니다. {message}' },
    P2030: { status: 400, message: '전체 텍스트 인덱스를 찾을 수 없습니다.' },
    P2031: { status: 500, message: 'MongoDB는 복제셋으로 실행되어야 합니다.' },
    P2033: { status: 400, message: '숫자 값이 BigInt 범위를 벗어났습니다.' },
    P2034: { status: 409, message: '쓰기 충돌 또는 교착 상태로 인해 트랜잭션이 실패되었습니다.' },
    P2035: { status: 500, message: '데이터베이스 어설션 위반입니다. {database_error}' },
    P2036: { status: 500, message: '외부 커넥터 오류가 있습니다. {id}' },
    P2037: { status: 503, message: '열린 데이터베이스 연결 수가 너무 많습니다. {message}' },
    P3005: { status: 500, message: '데이터베이스 스키마가 비어 있지 않습니다.' },
    P4001: { status: 500, message: '데이터베이스 연결이 끊겼습니다.' },
    P5011: { status: 429, message: '요청량이 초과되었습니다.' },
    P6000: { status: 500, message: 'Prisma 서버 에러가 발생했습니다.' },
    P6004: { status: 504, message: 'Prisma 쿼리 시간 초과가 발생했습니다.' },
    P6009: { status: 500, message: 'Prisma 응답 크기를 초과하였습니다.' },
    P6010: { status: 403, message: 'Prisma 프로젝트가 비활성화되었습니다.' }
} as const;
