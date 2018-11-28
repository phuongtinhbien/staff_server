CREATE OR REPLACE FUNCTION public.get_notification_customer(
	cus_id numeric)
    RETURNS SETOF task 
    LANGUAGE 'sql'

    COST 100
    VOLATILE 
    ROWS 1000
AS $BODY$

	select a.* from (
        (select t.* from task t inner join customer_order co on co.id = t.customer_order
        inner join customer cu on cu.id = co.customer_id where t.task_type = 'TASK_CUSTOMER_ORDER' and cu.id= cus_id and t.previous_task = 'N')
        UNION
        (select t.* from task t inner join receipt re on t.receipt = re.id
        inner join customer_order co on co.id = re.order_id
        inner join customer cu on cu.id = co.customer_id where t.task_type = 'TASK_RECEIPT' and cu.id= cus_id and t.previous_task = 'N')
    ) as a
 
$BODY$;

ALTER FUNCTION public.searchcustomerorders(character varying, numeric, numeric)
    OWNER TO postgres;
